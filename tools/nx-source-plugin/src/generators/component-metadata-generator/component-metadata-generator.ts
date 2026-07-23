// tools/nx-source-plugin/src/generators/component-metadata-generator/component-metadata-generator.ts
/**
 * Component Metadata Generator
 *
 * Scan ng-primitives and ng-ptimitives-extended packages, find all `@Component`/`@Directive`
 * decorated classes, extracts their metadata (inputs with type/possible values,
 * outputs, host directives, selectors), and writes one JSON file per component group to tmp/
 *
 * Registered as sync generator on the documentation app's build target.
 * Runs via `nx sync` or `nx build documentation --sync`
 * Also runs automatically in dev, when asked to sync the workspace
 */
import { ComponentMetadataGeneratorGeneratorSchema } from './schema';

import { createProjectGraphAsync, joinPathFragments, type Tree } from '@nx/devkit';
import type { SyncGeneratorResult } from 'nx/src/utils/sync-generators';
import { ObjectLiteralExpression, Project, PropertyAssignment, SyntaxKind } from 'ts-morph';

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { extname, join, relative, sep } from 'path';

interface ParsedInput {
  name: string;
  type: string;
  defaultValue?: string;
  possibleValues?: string[];
  fromHostDirective?: string;
}

interface ParsedOutput {
  name: string;
  type?: string;
  fromHostDirective?: string;
}

interface HostEntry {
  name: string;
  value: string;
}

interface HostDirectiveEntry {
  directive: string;
  inputs: string[];
  outputs: string[];
}

interface ParsedDirective {
  name: string;
  type: 'component' | 'directive';
  selector: string;
  exportAs: string;
  host: HostEntry[];
  inputs: ParsedInput[];
  outputs: ParsedOutput[];
  hostDirectives: HostDirectiveEntry[];
}

interface ComponentGroup {
  name: string;
  package: string;
  project: string;
  directives: ParsedDirective[];
}

/**
 * Recursivly finds all .ts files in a directory, exluding test and story files.
 * @param dir Directory to scan
 * @returns The list of TS file path
 */
function findTsFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      files.push(...findTsFiles(fullPath));
    } else if (
      extname(fullPath) === '.ts' &&
      !fullPath.endsWith('.spec.ts') &&
      !fullPath.endsWith('.stories.ts')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parse the `host` property of a `@Component`/`@Directive` decorator.
 *
 * Handle the shape:
 *   host: {
 *     class: 'mgnp-accordion mgnp-c-accordion',
 *     'data-mgnp-accordion': '',
 *     '[attr.data-mgnp-accordion-color]': 'color()',
 *   }
 * @param prop The host definition
 * @returns The parsed host entries
 */
function parseHost(prop: PropertyAssignment): HostEntry[] {
  const initializer = prop.getInitializer();

  if (!initializer?.isKind(SyntaxKind.ObjectLiteralExpression)) return [];

  const results: HostEntry[] = [];

  for (const property of initializer.getProperties()) {
    if (!property.isKind(SyntaxKind.PropertyAssignment)) continue;

    const obj = property as PropertyAssignment;

    const name = obj.getName();
    const value = obj.getInitializer()?.getText() ?? '';

    results.push({
      name,
      value,
    });
  }

  return results;
}

/**
 * Parses the `hostDirectives` property of a `@Component`/`@Directive` decorator.
 *
 * Handles the shape:
 *   hostDirectives: [{
 *     directive: NgpAccordion,
 *     inputs: ['ngpAccordionType:mgnpAccordionType', ...],
 *     outputs: ['ngpAccordionValueChange:mgnpAccordionValueChange']
 *   }]
 * @param prop The host directive definition
 * @returns The parsed host directive entries
 */
function parseHostDirectives(prop: PropertyAssignment): HostDirectiveEntry[] {
  const initializer = prop.getInitializer();

  if (!initializer?.isKind(SyntaxKind.ArrayLiteralExpression)) return [];

  const results: HostDirectiveEntry[] = [];

  for (const element of initializer.getElements()) {
    if (!element.isKind(SyntaxKind.ObjectLiteralExpression)) continue;

    const obj = element as ObjectLiteralExpression;

    const directiveProp = obj.getProperty('directive') as PropertyAssignment;
    const directiveName = directiveProp?.getInitializer()?.getText() ?? '';

    const inputsProp = obj.getProperty('inputs') as PropertyAssignment;
    const inputsArray = inputsProp?.getInitializer();

    const inputs: string[] = [];
    if (inputsArray?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      for (const item of inputsArray.getElements()) {
        if (item.isKind(SyntaxKind.StringLiteral)) {
          inputs.push(item.getLiteralValue());
        }
      }
    }

    const outputsProp = obj.getProperty('outputs') as PropertyAssignment;
    const outputsArray = outputsProp?.getInitializer();

    const outputs: string[] = [];
    if (outputsArray?.isKind(SyntaxKind.ArrayLiteralExpression)) {
      for (const item of outputsArray.getElements()) {
        if (item.isKind(SyntaxKind.StringLiteral)) {
          outputs.push(item.getLiteralValue());
        }
      }
    }

    results.push({ directive: directiveName, inputs, outputs });
  }

  return results;
}

/**
 * Parse a single .ts file and extracts metadata from any `@Component`/`@Directive` classes.
 *
 * For each decorated class, extracts:
 * - Decorator-level: selector, exportAs, hostDirective
 * - Class members: input() signals (with type + possible values via type alias resolution)
 *                  outputs() signals
 * - Host directive inputs/outputs remappings (format: remoteName:localName)
 * @param filePath Typescript file to parse
 * @returns The parsed directive entries
 */
function parseFile(filePath: string): ParsedDirective[] {
  const content = readFileSync(filePath, 'utf-8');
  const project = new Project({
    useInMemoryFileSystem: true,
    skipAddingFilesFromTsConfig: true,
  });
  const sourceFile = project.createSourceFile(filePath, content);
  const directives: ParsedDirective[] = [];

  for (const classDecl of sourceFile.getClasses()) {
    const componentDecorator = classDecl.getDecorator('Component');
    const directiveDecorator = classDecl.getDecorator('Directive');
    const decorator = componentDecorator || directiveDecorator;

    if (!decorator) continue;

    const decoratorType = componentDecorator ? 'component' : 'directive'; // Skip class without `@Component`/`@Directive`
    const callExpression = decorator.getCallExpression();

    if (!callExpression) continue;

    const firstArg = callExpression.getArguments()[0];

    if (!firstArg?.isKind(SyntaxKind.ObjectLiteralExpression)) continue;

    const decoratorObj = firstArg as ObjectLiteralExpression;

    // Decorator properties
    const selectorProp = decoratorObj.getProperty('selector') as PropertyAssignment;
    const selector = selectorProp?.getInitializer()?.getText().replace(/['"`]/g, '') ?? '';

    const exportAsProp = decoratorObj.getProperty('exportAs') as PropertyAssignment;
    const exportAs = exportAsProp?.getInitializer()?.getText().replace(/['"`]/g, '') ?? '';

    const hostProp = decoratorObj.getProperty('host');
    const host: HostEntry[] = hostProp ? parseHost(hostProp as PropertyAssignment) : [];

    const hostDirectivesProp = decoratorObj.getProperty('hostDirectives');
    const hostDirectives: HostDirectiveEntry[] = hostDirectivesProp
      ? parseHostDirectives(hostDirectivesProp as PropertyAssignment)
      : [];

    const inputs: ParsedInput[] = [];
    const outputs: ParsedOutput[] = [];

    // Class member inputs/outputs
    for (const member of classDecl.getMembers()) {
      if (!member.isKind(SyntaxKind.PropertyDeclaration)) continue;

      const initializer = member.getInitializer();
      if (!initializer?.isKind(SyntaxKind.CallExpression)) continue;

      const callExpr = initializer.asKind(SyntaxKind.CallExpression);
      if (!callExpr) continue;

      const functionName = callExpr.getExpression().getText();

      // Detect input()/input.required() signals
      if (functionName === 'input' || functionName === 'input.required') {
        const typeArgs = callExpr.getTypeArguments();
        const typeText = typeArgs.length > 0 ? typeArgs[0].getText() : 'unknown';

        // Resolve the type alias to extract literal possible values.
        // Example: MgnpButtonColor = PropertyType<'ui' | 'primary' | ...>
        //          -> resolves to ['ui', 'primary']
        let possibleValues: string[] = [];
        if (typeArgs.length > 0) {
          const typeArg = typeArgs[0];

          if (typeArg.isKind(SyntaxKind.TypeReference)) {
            const typeReference = typeArg.asKind(SyntaxKind.TypeReference);
            const symbol = typeReference?.getTypeName().getSymbol();

            if (symbol) {
              const declaration = symbol
                .getDeclarations()
                .find((x) => x.isKind(SyntaxKind.TypeAliasDeclaration));
              if (declaration) {
                const typeNode = declaration.getTypeNode();
                if (typeNode?.isKind(SyntaxKind.TypeReference)) {
                  const typeArguments = typeNode.getTypeArguments();
                  if (typeArguments.length > 0) {
                    const typeArgument = typeArguments[0];
                    if (typeArgument.isKind(SyntaxKind.UnionType)) {
                      const union = typeArgument.asKind(SyntaxKind.UnionType);
                      const types = union?.getTypeNodes();

                      if (types) {
                        possibleValues = types
                          .filter((x) => x.isKind(SyntaxKind.LiteralType))
                          .map((x) =>
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            x
                              .asKind(SyntaxKind.LiteralType)!
                              .getLiteral()
                              .asKind(SyntaxKind.StringLiteral)!
                              .getText()
                              .replace(/['"`]/gm, '')
                          );
                      }
                    } else if (typeArgument.isKind(SyntaxKind.LiteralType)) {
                      const literal = typeArgument.asKind(SyntaxKind.LiteralType);
                      if (literal) {
                        possibleValues = [
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          literal
                            .getLiteral()
                            .asKind(SyntaxKind.StringLiteral)!
                            .getText()
                            .replace(/['"`]/gm, ''),
                        ];
                      }
                    }
                  }
                }
              }
            }
          }
        }

        const args = callExpr.getArguments();
        const defaultValue = args.length > 0 ? args[0].getText().replace(/['"`]/gm, '') : undefined;

        inputs.push({
          name: member.getName(),
          type: typeText,
          possibleValues,
          defaultValue,
        });
      }

      // Detect output() signals
      if (functionName === 'output') {
        const typeArgs = callExpr.getTypeArguments();
        const typeText = typeArgs.length > 0 ? typeArgs[0].getText() : 'unknown';

        outputs.push({
          name: member.getName(),
          type: typeText,
        });
      }
    }

    // Host directive input/output remapping
    for (const hd of hostDirectives) {
      for (const inputStr of hd.inputs) {
        const parts = inputStr.split(':');
        const localName = parts[1] || parts[0];
        inputs.push({
          name: localName,
          type: 'unknown',
          fromHostDirective: `${hd.directive.trim()}:${parts[0].trim()}`,
        });
      }

      for (const outputStr of hd.outputs) {
        const parts = outputStr.split(':');
        const localName = parts[1] || parts[0];
        outputs.push({
          name: localName,
          fromHostDirective: `${hd.directive.trim()}:${parts[0].trim()}`,
        });
      }
    }
    directives.push({
      name: classDecl.getName() ?? 'Unknown',
      type: decoratorType,
      selector,
      exportAs,
      host,
      inputs,
      outputs,
      hostDirectives,
    });
  }
  return directives;
}

export async function componentMetadataGeneratorGenerator(
  tree: Tree,
  schema: ComponentMetadataGeneratorGeneratorSchema
): Promise<SyncGeneratorResult> {
  const projectGraph = await createProjectGraphAsync();
  const ngPrimitives = projectGraph.nodes['ng-primitives'];
  const ngPrimitivesExtended = projectGraph.nodes['ng-primitives-extended'];

  if (!ngPrimitives || !ngPrimitivesExtended) {
    console.warn('Could not find ng-primitives or ng-primitives-extended in project graph');
    return {
      outOfSyncMessage: 'Could not find ng-primitives or ng-primitives-extended in project graph',
    };
  }

  const workspaceRoot = tree.root;
  const projects = [
    { name: 'ng-primitives', data: ngPrimitives.data },
    { name: 'ng-primitives-extended', data: ngPrimitivesExtended.data },
  ];

  for (const project of projects) {
    // Resolve the absolute path of project root
    const projectRoot = join(workspaceRoot, project.data.root);
    // Get all files in the project exept for index.ts
    const tsFiles = findTsFiles(projectRoot).filter(
      (f) => f.includes(joinPathFragments('src', 'lib')) && !f.includes('index.ts')
    );

    // Group files by components (accordion, accordion-item, ... -> accordion)
    const componentGroups = new Map<string, string[]>();

    for (const filePath of tsFiles) {
      const relativePath = relative(projectRoot, filePath);
      const componentGroup = relativePath.split(sep)[0];

      if (!componentGroups.has(componentGroup)) {
        componentGroups.set(componentGroup, []);
      }

      componentGroups.get(componentGroup)?.push(filePath);
    }

    // Parse each component group abnd write JSON output
    for (const [componentName, files] of componentGroups) {
      const directives: ParsedDirective[] = [];

      for (const filePath of files) {
        directives.push(...parseFile(filePath));
      }

      if (directives.length === 0) continue;

      const componentGroup: ComponentGroup = {
        name: componentName,
        package: `@mgremy/${project.name}`,
        project: project.data.root,
        directives,
      };

      const outputPath = joinPathFragments(
        'tmp',
        project.data.root,
        'metadata',
        `${componentName}.json`
      );

      // Output: tmp/packages/ng-primitives/accordion/accordion.json
      tree.write(outputPath, JSON.stringify(componentGroup, null, 2));
    }
  }
}

export default componentMetadataGeneratorGenerator;

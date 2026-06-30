export function getFile(
  name: string,
  type: 'ng-primitives' | 'ng-primitives-extended'
): { name: string; content: string }[];
export function getFile(
  name: string,
  type: 'example',
  contentType: 'object'
): { name: string; content: unknown }[];
export function getFile(
  name: string,
  type: 'example',
  contentType: 'string'
): { name: string; content: string }[];
export function getFile(
  name: string,
  type: 'ng-primitives' | 'ng-primitives-extended' | 'example',
  contentType?: 'string' | 'object'
): { name: string; content: string | unknown }[] {
  const output: { name: string; content: string | unknown }[] = [];

  const cssNgPrimitivesContents = import.meta.glob(
    '../../../../../packages/ng-primitives/_theme/**/*.css',
    {
      import: 'default',
      query: '?raw',
      eager: true,
    }
  );
  const cssNgPrimitivesExtendedContents = import.meta.glob(
    '../../../../../packages/ng-primitives-extended/_theme/**/*.css',
    {
      import: 'default',
      query: '?raw',
      eager: true,
    }
  );
  const exampleContents = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    query: '?source',
    eager: true,
  });
  const examples = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    eager: true,
  });

  let files: Record<string, unknown>;

  if (type === 'ng-primitives') {
    files = cssNgPrimitivesContents;
  } else if (type === 'ng-primitives-extended') {
    files = cssNgPrimitivesExtendedContents;
  } else {
    if (contentType === 'string') {
      files = exampleContents;
    } else {
      files = examples;
    }
  }

  for (const [path, content] of Object.entries(files)) {
    const splitPath = path.split('/');

    if (type === 'example') {
      if (splitPath[splitPath.length - 2] === name) {
        output.push({ name: splitPath[splitPath.length - 1].split('.')[0], content });
      }
    } else {
      if (splitPath[splitPath.length - 1] === `${name}.css`) {
        output.push({ name, content: content as string });
      } else if (splitPath[splitPath.length - 2] === name) {
        output.push({
          name: splitPath[splitPath.length - 1].split('.')[0],
          content: content as string,
        });
      }
    }
  }

  return output;
}

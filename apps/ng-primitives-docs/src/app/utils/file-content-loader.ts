export const getNgPrimitivesCssContent = (componentName: string) => {
  const results = import.meta.glob('../../../../../libs/ng-primitives/theme/**/*.css', {
    import: 'default',
    query: '?raw',
    eager: true,
  });

  for (const [path, content] of Object.entries(results)) {
    const splitPath = path.split('/');

    if (splitPath[splitPath.length - 1] === `${componentName}.css`) {
      return content as string;
    }
  }

  return '';
};

export const getExample = (componentName: string): { path: string; content: unknown }[] | null => {
  const results = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    eager: true,
  });

  const output: { path: string; content: unknown }[] = [];

  for (const [path, content] of Object.entries(results)) {
    const splitPath = path.split('/');

    if (splitPath[splitPath.length - 2] === componentName) {
      output.push({ path: path, content: content });
    }
  }

  return output;
};

export const getExampleContent = (componentName: string): { path: string; content: string }[] => {
  const results = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    query: '?source',
    eager: true,
  });

  const output: { path: string; content: string }[] = [];

  for (const [path, content] of Object.entries(results)) {
    const splitPath = path.split('/');

    if (splitPath[splitPath.length - 2] === componentName) {
      output.push({ path: path, content: content as string });
    }
  }

  return output;
};

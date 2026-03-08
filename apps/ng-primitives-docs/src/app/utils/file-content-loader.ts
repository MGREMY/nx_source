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

export const getExample = (componentName: string): unknown | null => {
  const results = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    eager: true,
  });

  for (const [path, content] of Object.entries(results)) {
    const splitPath = path.split('/');

    if (splitPath[splitPath.length - 1] === `${componentName}.example.ts`) {
      return content;
    }
  }

  return null;
}

export const getExampleContent = (componentName: string) => {
  const results = import.meta.glob('../examples/**/*.example.ts', {
    import: 'default',
    query: '?source',
    eager: true,
  });

  for (const [path, content] of Object.entries(results)) {
    const splitPath = path.split('/');

    if (splitPath[splitPath.length - 1] === `${componentName}.example.ts`) {
      return content as string;
    }
  }

  return '';
}

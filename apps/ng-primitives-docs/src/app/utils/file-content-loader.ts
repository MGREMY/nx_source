export const getNgPrimitivesCssContent = (componentName: string) => {
  const results = import.meta.glob('../../../../../libs/ng-primitives/theme/components/*.css', {
    import: 'default',
    query: '?raw',
    eager: true,
  });

  for (const [path, content] of Object.entries(results)) {
    const splitedPath = path.split('/');

    if (splitedPath[splitedPath.length - 1] === `${componentName}.css`) {
      return content as string;
    }
  }

  return '';
};

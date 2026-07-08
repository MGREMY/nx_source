export default {
  '*': (files) => {
    return [
      'pnpm exec nx format:write',
      `pnpm exec nx affected --target=lint --files=${files.join(',')}`,
    ];
  },
};

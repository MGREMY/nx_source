export default {
  '*': (files) => {
    return [
      `pnpm exec nx format:write --files=${files.join(',')}`,
      `pnpm exec nx affected --target=lint --files=${files.join(',')}`,
    ];
  },
};

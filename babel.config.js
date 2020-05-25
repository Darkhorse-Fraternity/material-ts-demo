module.exports = function (api) {
  api.cache(true);
  const presets = ["esnext"];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./scr'],
        extensions: [, '.js', '.ts', '.tsx', '.json', '.png', '.jpg'],
        alias: {
          underscore: 'lodash',
        },
      },
    ],
  ];

  const env = {
    production: {
      plugins: ['transform-remove-console'],
    },
  };
  return {
    presets,
    plugins,
    env,
  };
};

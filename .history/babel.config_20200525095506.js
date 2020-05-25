module.exports = function (api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./scr'],
        extensions: ['.js', '.ts', '.tsx', '.json', '.png', '.jpg'],
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

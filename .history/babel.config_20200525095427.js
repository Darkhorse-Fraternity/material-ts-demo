module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ts',
          '.tsx',
          '.json',
          '.png',
          '.jpg',
        ],
        alias: {
          '@request': './src/request',
          '@components': './src/components',
          '@pages': './src/pages',
          '@img': './source/img',
          '@animations': './source/animations',
          '@local_modules': './local_modules',
          'test/*': './test/*',
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

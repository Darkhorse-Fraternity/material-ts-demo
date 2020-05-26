// import { Config } from 'yapi-to-typescript';

// const config: Config = [
//   {
//     serverUrl: 'http://39.99.162.233:3000',
//     typesOnly: false,
//     reactHooks: {
//       enabled: true,
//     },
//     devEnvName: 'dev',
//     prodEnvName: 'production',
//     outputFilePath: 'src/api/index.ts',
//     requestFunctionFilePath: 'src/api/request.ts',
//     // dataKey: '',
//     projects: [
//       {
//         token: '045a8d1d98f859a5d111',
//         categories: [
//           {
//             id: 26,
//             getRequestFunctionName(interfaceInfo, changeCase) {
//               return changeCase.camelCase(interfaceInfo.parsedPath.name);
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];

import { Config, ExtendedInterface, ChangeCase } from 'yapi-to-typescript';

const token = '045a8d1d98f859a5d111';
const getRequestFunctionName = (
  interfaceInfo: ExtendedInterface,
  changeCase: ChangeCase
) => {
  const { name, dir } = interfaceInfo.parsedPath;
  const dirString = dir.replace(/\//g, ' ');
  return changeCase.camelCase(`${dirString} ${name}`);
};

const config: Config = [
  {
    serverUrl: 'http://39.99.162.233:3000',
    typesOnly: false,
    reactHooks: {
      enabled: true,
    },
    devEnvName: 'dev',
    prodEnvName: 'prod',
    outputFilePath: 'src/api/index.ts',
    requestFunctionFilePath: 'src/api/request.ts',
    projects: [
      {
        token,
        categories: [
          {
            id: [26],
            getRequestFunctionName,
          },
        ],
      },
    ],
  },
];

export default config;

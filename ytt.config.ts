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

const token = '5911189697ac33dfd098dc15b6f987e3d9a62cdb09f9e115a799b0f248ded6cf';
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
    serverUrl: 'http://121.89.170.197:3000',
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

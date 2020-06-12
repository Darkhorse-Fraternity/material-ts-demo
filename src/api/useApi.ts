import useSWR, { ConfigInterface, responseInterface } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export type RequestDataType = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
  responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
  'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
  // 感觉 ts 出了bug 似的
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ConfigInterface<AxiosResponse<Data>, AxiosError<any>>,
  'initialData'
  > {
  initialData?: Data;
}

export default function useApi<Data = unknown, Error = unknown>(
  data: RequestDataType,
  reuqest: Function,
  { initialData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
//   console.log('useApi', data);
    
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
  AxiosResponse<Data>,
  AxiosError<Error>
  >(
    data && JSON.stringify(data), // 只做重载使用
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => reuqest(),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: data || ({} as AxiosRequestConfig),
        headers: {},
        data: initialData,
      },
    }
  );

  //   console.log('response', response);
  
  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}

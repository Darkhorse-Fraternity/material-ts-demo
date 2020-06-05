import { RequestConfig } from 'yapi-to-typescript';
import { AxiosResponse } from 'axios';
import { Request } from './index';
import baseRequest from './request';
import { leancloudHeaders } from './leancloud';
import useApi, { Config } from './useApi';

interface ErrorType {
  code: number;
  error: string;
}

export default function makeRequestHook<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(getRequest: Request<TRequestData, TRequestConfig, TRequestResult>) {
  type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult;
  type InnerData = Data extends AxiosResponse<infer R> ? R : Data;
  return function useRequest(
    requestData: TRequestData,
    config?: Config<InnerData, unknown> & { autoTrigger?: boolean }
  ) {
    // 一个简单的 Hook 实现，实际项目可结合其他库使用，比如：
    // @umijs/hooks 的 useRequest (https://github.com/umijs/hooks)
    // swr (https://github.com/zeit/swr)

    // };
    // 这边废弃普通promise的调用 直接使用 useSWR
    // console.log('000');

    // // const request = getRequest(requestData);
    // console.log('xxx');

    const { autoTrigger = true, ...restConfig } = config || {};

    return useApi<InnerData, ErrorType>(
      {
        data: requestData,
        headers: leancloudHeaders,
      },
      () => getRequest(requestData),
      {
        revalidateOnFocus: autoTrigger,
        revalidateOnReconnect: autoTrigger,
        revalidateOnMount: autoTrigger,
        ...restConfig,
      }
    );
  };
}

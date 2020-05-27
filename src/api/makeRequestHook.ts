import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './index';
import baseRequest from './request';
import { leancloudHeaders } from './leancloud';
import useApi, { Config } from './useApi';

export default function makeRequestHook<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult extends ReturnType<typeof baseRequest>
>(requestConfig: Request<TRequestData, TRequestConfig, TRequestResult>) {
  type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult;
  return function useRequest(
    requestData: TRequestData,
    config?: Config<unknown, unknown> & { autoTrigger?: boolean }
  ) {
    // 一个简单的 Hook 实现，实际项目可结合其他库使用，比如：
    // @umijs/hooks 的 useRequest (https://github.com/umijs/hooks)
    // swr (https://github.com/zeit/swr)

    // };
    // 这边废弃普通promise的调用 直接使用 useSWR
    const { payload, options } = requestConfig(requestData);
    const { path, method, data, devUrl, prodUrl } = payload;
    const baseURL = options.server === 'dev' ? devUrl : prodUrl;

    const { autoTrigger = true, ...restConfig } = config || {};

    return useApi(
      {
        baseURL,
        url: path,
        method,
        headers: leancloudHeaders,
        data,
      },
      {
        revalidateOnFocus: autoTrigger,
        revalidateOnReconnect: autoTrigger,
        ...restConfig,
      }
    );
  };
}

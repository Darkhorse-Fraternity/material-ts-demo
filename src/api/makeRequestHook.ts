import { useState, useEffect } from 'react';
import { RequestConfig } from 'yapi-to-typescript';
import { Request } from './index';
import baseRequest from './request';

export default function makeRequestHook<TRequestData, TRequestConfig extends RequestConfig, TRequestResult extends ReturnType<typeof baseRequest>>(request: Request<TRequestData, TRequestConfig, TRequestResult>) {
  type Data = TRequestResult extends Promise<infer R> ? R : TRequestResult;
  return function useRequest(requestData: TRequestData) {
    // 一个简单的 Hook 实现，实际项目可结合其他库使用，比如：
    // @umijs/hooks 的 useRequest (https://github.com/umijs/hooks)
    // swr (https://github.com/zeit/swr)

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Data>();

    useEffect(() => {
      request(requestData).then(data => {
        setLoading(false);
        setData(data as any);
      });
    }, [JSON.stringify(requestData)]);

    return {
      loading,
      data,
    };
  };
}
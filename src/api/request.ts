import { RequestFunctionParams } from 'yapi-to-typescript';
import axios, { AxiosResponse } from 'axios';
import { leancloudHeaders } from './leancloud';

export interface RequestOptions {
  /**
   * 使用的服务器。
   *
   * - `prod`: 生产服务器
   * - `dev`: 测试服务器
   * - `mock`: 模拟服务器
   *
   * @default prod
   */
  server?: 'prod' | 'dev' | 'mock';
}

export default function request<TResponseData>(
  payload: RequestFunctionParams,
  options: RequestOptions = {
    server: 'dev',
  }
): Promise<AxiosResponse<TResponseData>> {
  const { path, method, data, devUrl, prodUrl } = payload;
  const baseURL = options.server === 'dev' ? devUrl : prodUrl;
  //   return { payload, options };
  
  const config = method === 'GET' ?{ params:data, }:{ data };
  
  return axios({
    baseURL,
    url: path,
    method,
    headers: leancloudHeaders,
    ...config
  });
}

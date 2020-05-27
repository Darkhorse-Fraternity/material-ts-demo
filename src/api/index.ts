/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { Method, RequestBodyType, ResponseBodyType, RequestConfig, RequestFunctionRestArgs, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
import request from './request'
// @ts-ignore
import makeRequestHook from './makeRequestHook'

// makeRequest
function makeRequestRequired<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
  requestConfig: TRequestConfig,
) {
  const req = function(requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
  }
  req.requestConfig = requestConfig
  return req
}
function makeRequestOptional<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(
  requestConfig: TRequestConfig,
) {
  const req = function(requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) {
    return request<TResponseData>(prepare(requestConfig, requestData), ...args)
  }
  req.requestConfig = requestConfig
  return req
}
function makeRequest<TReqeustData, TResponseData, TRequestConfig extends RequestConfig>(requestConfig: TRequestConfig) {
  const optional = makeRequestOptional<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
  const required = makeRequestRequired<TReqeustData, TResponseData, TRequestConfig>(requestConfig)
  return (requestConfig.requestDataOptional ? optional : required) as TRequestConfig['requestDataOptional'] extends true
    ? typeof optional
    : typeof required
}

// Request
export type Request<
  TReqeustData,
  TRequestConfig extends RequestConfig,
  TRequestResult
> = (TRequestConfig['requestDataOptional'] extends true
  ? (requestData?: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
  : (requestData: TReqeustData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
  requestConfig: TRequestConfig
}

const mockUrl_0_0_0_0 = 'http://121.89.170.197:3000/mock/17' as any
const devUrl_0_0_0_0 = 'https://jrfwyncx.lc-cn-n1-shared.com' as any
const prodUrl_0_0_0_0 = '' as any
const dataKey_0_0_0_0 = undefined as any

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **请求类型**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
export interface ApiLoginRequest {
  username: string
  password: string
}

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **返回类型**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
export interface ApiLoginResponse {
  sessionToken: string
  updatedAt: string
  objectId: string
  username: string
  createdAt: string
  emailVerified: boolean
  mobilePhoneVerified: boolean
}

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
type ApiLoginRequestConfig = Readonly<
  RequestConfig<
    'http://121.89.170.197:3000/mock/17',
    'https://jrfwyncx.lc-cn-n1-shared.com',
    '',
    '/1.1/login',
    undefined,
    string,
    false
  >
>

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **请求配置**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
const apiLoginRequestConfig: ApiLoginRequestConfig = {
  mockUrl: mockUrl_0_0_0_0,
  devUrl: devUrl_0_0_0_0,
  prodUrl: prodUrl_0_0_0_0,
  path: '/1.1/login',
  method: Method.POST,
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_0_0_0,
  paramNames: [],
  requestDataOptional: false,
}

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **请求函数**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
export const apiLogin = makeRequest<ApiLoginRequest, ApiLoginResponse, ApiLoginRequestConfig>(apiLoginRequestConfig)

/**
 * 接口 [登录↗](http://121.89.170.197:3000/project/17/interface/api/8) 的 **React Hook**
 *
 * @分类 [公共分类↗](http://121.89.170.197:3000/project/17/interface/api/cat_18)
 * @请求头 `POST /1.1/login`
 * @更新时间 `2020-05-27 11:27:26`
 */
export const useApiLogin = makeRequestHook<ApiLoginRequest, ApiLoginRequestConfig, ReturnType<typeof apiLogin>>(
  apiLogin,
)

/* prettier-ignore-end */

export const HTTP_CLIENT_TOKEN = Symbol('HTTP_CLIENT_TOKEN')

type QueryParameterValue = string | number | string[] | number[]
type DataParameterValue = string | boolean | number | string[] | number[] | boolean[] | null
type HeaderValue = string | string[] | number | boolean | null

export interface HttpClientResponse<R> {
    headers?: Record<string, HeaderValue>
    statusCode: number
    data: R
}

export interface HttpClientQueryRequestParams<R> {
    queryParameters?: Record<string, QueryParameterValue>
    abortController?: AbortController
    headers?: Record<string, HeaderValue>
    transformer?: (data: any, headers: Record<string, string>, statusCode?: number) => R
}

export type HttpClientDataRequestData = Record<string, DataParameterValue> | FormData | string

export interface HttpClientDataRequestParams<R> {
    queryParameters?: Record<string, QueryParameterValue>
    data: HttpClientDataRequestData
    abortController?: AbortController
    headers?: Record<string, HeaderValue>
    transformer?: (data: any, headers: Record<string, HeaderValue>, statusCode?: number) => R
}

export interface IHttpClient {
    delete: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>
    head: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>
    get: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>
    patch: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>
    post: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>
    put: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>
}

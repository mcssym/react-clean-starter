/**
 * Token used to identify the HTTP client.
 */
export const HTTP_CLIENT_TOKEN = Symbol('HTTP_CLIENT_TOKEN');

/**
 * Type representing a query parameter value.
 */
type QueryParameterValue = string | number | string[] | number[];

/**
 * Type representing a data parameter value.
 */
type DataParameterValue = string | boolean | number | string[] | number[] | boolean[] | null;

/**
 * Type representing a header value.
 */
type HeaderValue = string | string[] | number | boolean | null;

/**
 * Interface representing the response from an HTTP client.
 * @template R - The type of the response data.
 */
export interface HttpClientResponse<R> {
    /**
     * Optional headers included in the response.
     */
    headers?: Record<string, HeaderValue>;

    /**
     * Status code of the response.
     */
    statusCode: number;

    /**
     * Data included in the response.
     */
    data: R;
}

/**
 * Interface representing the parameters for an HTTP client query request.
 * @template R - The type of the response data.
 */
export interface HttpClientQueryRequestParams<R> {
    /**
     * Optional query parameters to include in the request.
     */
    queryParameters?: Record<string, QueryParameterValue>;

    /**
     * Optional AbortController to cancel the request.
     */
    abortController?: AbortController;

    /**
     * Optional headers to include in the request.
     */
    headers?: Record<string, HeaderValue>;

    /**
     * Optional transformer function to transform the response data.
     * @param data - The response data.
     * @param headers - The response headers.
     * @param statusCode - The response status code.
     * @returns The transformed response data.
     */
    transformer?: (data: any, headers: Record<string, string>, statusCode?: number) => R;
}

/**
 * Type representing the data for an HTTP client data request.
 */
export type HttpClientDataRequestData = Record<string, DataParameterValue> | FormData | string;

/**
 * Interface representing the parameters for an HTTP client data request.
 * @template R - The type of the response data.
 */
export interface HttpClientDataRequestParams<R> {
    /**
     * Optional query parameters to include in the request.
     */
    queryParameters?: Record<string, QueryParameterValue>;

    /**
     * Data to include in the request.
     */
    data: HttpClientDataRequestData;

    /**
     * Optional AbortController to cancel the request.
     */
    abortController?: AbortController;

    /**
     * Optional headers to include in the request.
     */
    headers?: Record<string, HeaderValue>;

    /**
     * Optional transformer function to transform the response data.
     * @param data - The response data.
     * @param headers - The response headers.
     * @param statusCode - The response status code.
     * @returns The transformed response data.
     */
    transformer?: (data: any, headers: Record<string, HeaderValue>, statusCode?: number) => R;
}

/**
 * Interface representing an HTTP client.
 */
export interface IHttpClient {
    /**
     * Sends a DELETE request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Optional parameters for the request.
     * @returns A promise that resolves to the response.
     */
    delete: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>;

    /**
     * Sends a HEAD request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Optional parameters for the request.
     * @returns A promise that resolves to the response.
     */
    head: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>;

    /**
     * Sends a GET request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Optional parameters for the request.
     * @returns A promise that resolves to the response.
     */
    get: <R>(path: string, params?: HttpClientQueryRequestParams<R>) => Promise<HttpClientResponse<R>>;

    /**
     * Sends a PATCH request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Parameters for the request.
     * @returns A promise that resolves to the response.
     */
    patch: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>;

    /**
     * Sends a POST request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Parameters for the request.
     * @returns A promise that resolves to the response.
     */
    post: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>;

    /**
     * Sends a PUT request.
     * @template R - The type of the response data.
     * @param path - The path of the request.
     * @param params - Parameters for the request.
     * @returns A promise that resolves to the response.
     */
    put: <R>(path: string, params: HttpClientDataRequestParams<R>) => Promise<HttpClientResponse<R>>;
}

import { Axios, isAxiosError, type AxiosRequestConfig, type AxiosResponse, type AxiosResponseHeaders } from 'axios';
import type { HttpClientDataRequestData, HttpClientDataRequestParams, HttpClientQueryRequestParams, HttpClientResponse, IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import type { IAxiosHttpErrorHandler } from './axios-http-error-handler';

export const AXIOS_INSTANCE_PROVIDER_TOKEN = Symbol('AXIOS_INSTANCE_PROVIDER_TOKEN')

export interface IAxiosInstanceProvider {
    get axios(): Axios
}

const NOMINAL = Symbol('AxiosHttpClient');
export class AxiosHttpClient implements IHttpClient, IAxiosInstanceProvider {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('AxiosHttpClient');

    readonly #axios: Axios
    readonly #errorHandler: IAxiosHttpErrorHandler;

    constructor(errorHandler: IAxiosHttpErrorHandler, config?: AxiosRequestConfig) {
        this.#axios = new Axios({
            ...config,
            validateStatus: status => {
                return status >= 200 && status < 400;
            }
        })

        this.#errorHandler = errorHandler;
    }

    /**
     * Returns the Axios instance used by the HTTP client
     * @returns The Axios instance used by the HTTP client
     * @public
     * @readonly
     */
    get axios(): Axios {
        return this.#axios
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async delete<R>(path: string, params?: HttpClientQueryRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.delete<R, AxiosResponse<R>>(path, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async head<R>(path: string, params?: HttpClientQueryRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.head<R, AxiosResponse<R>>(path, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async get<R>(path: string, params?: HttpClientQueryRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.get<R, AxiosResponse<R>>(path, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async patch<R>(path: string, params: HttpClientDataRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.patch<R, AxiosResponse<R>, HttpClientDataRequestData>(path, params.data, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async post<R>(path: string, params: HttpClientDataRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.post<R, AxiosResponse<R>, HttpClientDataRequestData>(path, params.data, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }

    /**
     * @inheritDoc
     * @async
     * @public
     */
    async put<R>(path: string, params: HttpClientDataRequestParams<R>): Promise<HttpClientResponse<R>> {
        try {
            const response = await this.#axios.put<R, AxiosResponse<R>, HttpClientDataRequestData>(path, params.data, {
                params: params?.queryParameters,
                headers: params?.headers,
                signal: params?.abortController?.signal,
                transformResponse: (data: any, headers: AxiosResponseHeaders, status?: number) => {
                    if (status != null && status >= 400) {
                        return data;
                    }
                    return params?.transformer?.(data, headers, status) ?? data
                },
            })

            return {
                statusCode: response.status,
                data: response.data,
            }
        } catch (error) {
            if (isAxiosError(error)) {
                throw this.#errorHandler.handle(error);
            }
            throw error;
        }
    }
}

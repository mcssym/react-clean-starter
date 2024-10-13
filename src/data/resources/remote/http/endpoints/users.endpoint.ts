import type { IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import { UsersMeResponse } from '../responses/users/me.response';

export const AUTH_ENDPOINT_TOKEN = Symbol('AUTH_ENDPOINT_TOKEN');

export interface IUsersEndpoint {
    me: () => Promise<UsersMeResponse>;
}

export class UsersEndpoint implements IUsersEndpoint {
    static readonly token = Symbol('UsersEndpoint');

    readonly #httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.#httpClient = httpClient;
    }

    async me(): Promise<UsersMeResponse> {
        const result = await this.#httpClient.get('/v1/users/me', {
            transformer: data => {
                return UsersMeResponse.fromJson(JSON.parse(data as string) as Record<string, unknown>);
            }
        });

        return result.data;
    }
}

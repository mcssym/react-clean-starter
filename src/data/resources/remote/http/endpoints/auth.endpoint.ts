import { plainToInstance } from 'class-transformer';
import type { IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import type { LoginDto } from '../dto/auth/login.dto';
import { LoginResponse } from '../responses/auth/login.response';
import type { RecoverDto } from '../dto/auth/recover.dto';

export const AUTH_ENDPOINT_TOKEN = Symbol('AUTH_ENDPOINT_TOKEN');

export interface IAuthEndpoint {
    login: (dto: LoginDto) => Promise<LoginResponse>;
    recover: (dto: RecoverDto) => Promise<void>;
}

export class AuthEndpoint implements IAuthEndpoint {
    static readonly token = Symbol('AuthEndpoint');

    readonly #httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.#httpClient = httpClient;
    }

    async recover(dto: RecoverDto): Promise<void> {
        await this.#httpClient.post('/v1/auth/recover', {
            data: JSON.stringify(dto.toData()),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    async login(dto: LoginDto): Promise<LoginResponse> {
        const result = await this.#httpClient.post('/v1/auth/login', {
            data: JSON.stringify(dto.toData()),
            headers: {
                'Content-Type': 'application/json'
            },
            transformer: data => {
                return plainToInstance(LoginResponse, JSON.parse(data as string) as Record<string, unknown>);
            }
        });

        return result.data;
    }

    async logout(): Promise<void> {
        await this.#httpClient.delete('/v1/auth/logout');
    }
}

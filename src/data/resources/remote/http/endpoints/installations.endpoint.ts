import type { UpdateInstallationDto } from './../dto/installations/update-installation.dto';
import { plainToInstance } from 'class-transformer';
import type { IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import type { CreateInstallationDto } from '../dto/installations/create-installation.dto';
import { CreateInstallationResponse } from '../responses/installations/create-installation.response';

export const INSTALLATION_ENDPOINT_TOKEN = Symbol('AUTH_ENDPOINT_TOKEN');

export interface IInstallationEndpoint {
    create: (dto: CreateInstallationDto) => Promise<CreateInstallationResponse>;
    update: (uuid: string, dto: UpdateInstallationDto) => Promise<void>;
}

export class InstallationEndpoint implements IInstallationEndpoint {
    static readonly token = Symbol('InstallationEndpoint');

    readonly #httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.#httpClient = httpClient;
    }

    async create(dto: CreateInstallationDto): Promise<CreateInstallationResponse> {
        const result = await this.#httpClient.post('/v1/installations', {
            data: JSON.stringify(dto.toData()),
            headers: {
                'Content-Type': 'application/json'
            },
            transformer: data => {
                return plainToInstance(CreateInstallationResponse, JSON.parse(data as string) as Record<string, unknown>);
            }
        });

        return result.data;
    }

    async update(uuid: string, dto: UpdateInstallationDto): Promise<void> {
        await this.#httpClient.patch(`/v1/installations/${uuid}`, {
            data: dto.toData(),
        });
    }
}

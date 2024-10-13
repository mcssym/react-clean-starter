import type { IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import { InstitutionResponse } from '../responses/institutions/institution-response';
import type { FindManyDto } from '../dto/find-many-query.dto';
import { InstitutionsResponse } from '../responses/institutions/institutions-response';


export class InstitutionsEndpoint {
    static readonly token = Symbol('InstitutionsEndpoint');

    readonly #httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.#httpClient = httpClient;
    }

    async find(uuid: string): Promise<InstitutionResponse> {
        const result = await this.#httpClient.get(`/v1/institutions/${uuid}`, {
            transformer: data => {
                return InstitutionResponse.fromJson(JSON.parse(data as string) as Record<string, unknown>);
            }
        });

        return result.data;
    }

    async findMany(query: FindManyDto): Promise<InstitutionsResponse> {
        const result = await this.#httpClient.get(`/v1/institutions`, {
            queryParameters: query.toData(),
            transformer: data => {
                return InstitutionsResponse.fromJson(JSON.parse(data as string) as Record<string, unknown>);
            }
        });

        return result.data;
    }
}

import { type IHttpClient } from 'foundation/core/system/io/http/IHttpClient';
import { MessageModel } from '../models/MessageModel';
import { type SaveDTO } from '../dto/messages/SaveDTO';
import { plainToInstance } from 'class-transformer';

export const MESSAGE_ENDPOINT_TOKEN = Symbol('MESSAGE_ENDPOINT_TOKEN');

export interface IMessageEndpoint {
    save: (dto: SaveDTO) => Promise<void>;
    readAll: () => Promise<MessageModel[]>;
}

export class MessageEndpoint implements IMessageEndpoint {
    static readonly token = Symbol('MessageEndpoint');

    readonly #httpClient: IHttpClient;

    constructor(httpClient: IHttpClient) {
        this.#httpClient = httpClient;
    }

    async save(dto: SaveDTO): Promise<void> {
        await this.#httpClient.post('/messages', {
            data: dto.toData()
        });
    }

    async readAll(): Promise<MessageModel[]> {
        const results = await this.#httpClient.get('/messages', {
            transformer: data => {
                return plainToInstance(MessageModel, data) as unknown as MessageModel[];
            }
        });

        return results.data;
    }
}

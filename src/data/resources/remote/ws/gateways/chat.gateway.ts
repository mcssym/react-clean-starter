import { WebSocketDataType, type IWebSocketClient, type JsonWebSocketResponse } from '@foundation/core/system/io/ws/i-web-socket-client';
import { filter, map, type Observable } from 'rxjs';
import { MessageModel } from '../models/message.model';
import { plainToInstance } from 'class-transformer';

export const CHAT_GATEWAY_TOKEN = Symbol('CHAT_GATEWAY_TOKEN');

export interface IChatGateway {
    onMessage: () => Observable<MessageModel>;
}

export class ChatGateway implements IChatGateway {
    static readonly token = Symbol('ChatGateway');

    readonly #wsClient: IWebSocketClient;

    constructor(wsClient: IWebSocketClient) {
        this.#wsClient = wsClient;
    }

    onMessage(): Observable<MessageModel> {
        return this.#wsClient.on('/messages')
            .pipe(
                filter(response => response.type === WebSocketDataType.json),
                map(response => plainToInstance(MessageModel, (response as JsonWebSocketResponse).json)),
            );
    }
}

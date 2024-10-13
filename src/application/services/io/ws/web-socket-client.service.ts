import { WebSocketDataType, type BinaryWebSocketResponse, type IWebSocketClient, type JsonWebSocketResponse, type PlainTextWebSocketMessage, type WebSocketMessage, type WebSocketResponse } from '@foundation/core/system/io/ws/i-web-socket-client';
import { isObjectLiteral } from '@foundation/supports/helpers';
import { Subject, filter, type Observable } from 'rxjs';
import { io, type Socket } from 'socket.io-client';

export interface WebSocketClientServiceConfig {
    url: string;
}

const NOMINAL = Symbol('WebSocketClientService');
export class WebSocketClientService implements IWebSocketClient {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('WebSocketClientService');

    #connected: boolean;
    readonly #connectionSubject: Subject<boolean>;

    readonly #socket: Socket;
    readonly #responseSubject: Subject<WebSocketResponse>;

    constructor(config: WebSocketClientServiceConfig) {
        this.#socket = io(config.url);

        this.#connected = false;
        this.#connectionSubject = new Subject();
        this.#responseSubject = new Subject<WebSocketResponse>();
    }

    initialize(): void {
        this.#socket.on('connect', () => {
            this.#connected = true;
            this.#connectionSubject.next(true);
        });

        this.#socket.on('disconnect', () => {
            this.#connected = false;
            this.#connectionSubject.next(false);
        });

        this.#socket.on('message', (data) => {
            let response: WebSocketResponse | null = null;

            if (typeof data === 'string') {
                response = {
                    type: WebSocketDataType.plainText,
                    text: data,
                } satisfies PlainTextWebSocketMessage;
            } else if (data instanceof ArrayBuffer) {
                response = {
                    type: WebSocketDataType.binary,
                    binary: new Uint8Array(data),
                } satisfies BinaryWebSocketResponse;
            } else if (isObjectLiteral(data)) {
                response = {
                    type: WebSocketDataType.json,
                    json: data
                } satisfies JsonWebSocketResponse;
            } else {
                console.error('Unsupported WebSocket data type:', data);
                return;
            }

            this.#responseSubject.next(response);
        });
    }

    get connected(): boolean {
        return this.#connected;
    }

    get onConnectionChange(): Observable<boolean> {
        return this.#connectionSubject.asObservable();
    }

    emit(path: string, data: WebSocketMessage): void {
        this.#socket.emit(path, data);
    }

    on(path: string): Observable<WebSocketResponse> {
        return this.#responseSubject.asObservable().pipe(
            filter((response) => response.type === path)
        );
    }
}

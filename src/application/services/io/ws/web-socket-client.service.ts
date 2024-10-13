import { WebSocketDataType, type BinaryWebSocketResponse, type IWebSocketClient, type JsonWebSocketResponse, type PlainTextWebSocketMessage, type WebSocketMessage, type WebSocketResponse } from '@foundation/core/system/io/ws/i-web-socket-client';
import { isObjectLiteral } from '@foundation/supports/helpers';
import { Subject, filter, type Observable } from 'rxjs';
import { io, type Socket } from 'socket.io-client';

/**
 * Configuration interface for WebSocketClientService.
 */
export interface WebSocketClientServiceConfig {
    /**
     * The URL of the WebSocket server.
     */
    url: string;
}

/**
 * Symbol used to identify the WebSocketClientService.
 */
const NOMINAL = Symbol('WebSocketClientService');

/**
 * Service class for managing WebSocket connections.
 */
export class WebSocketClientService implements IWebSocketClient {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the WebSocketClientService.
     */
    static readonly token: symbol = Symbol('WebSocketClientService');

    /**
     * Indicates whether the WebSocket is connected.
     */
    #connected: boolean;

    /**
     * Subject to track connection status changes.
     */
    readonly #connectionSubject: Subject<boolean>;

    /**
     * The WebSocket client instance.
     */
    readonly #socket: Socket;

    /**
     * Subject to track WebSocket responses.
     */
    readonly #responseSubject: Subject<WebSocketResponse>;

    /**
     * Constructor for WebSocketClientService.
     * @param {WebSocketClientServiceConfig} config - The configuration for the WebSocket client.
     */
    constructor(config: WebSocketClientServiceConfig) {
        this.#socket = io(config.url);

        this.#connected = false;
        this.#connectionSubject = new Subject();
        this.#responseSubject = new Subject<WebSocketResponse>();
    }

    /**
     * Initializes the WebSocket connection and sets up event listeners.
     */
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

    /**
     * Gets the connection status of the WebSocket.
     * @returns {boolean} True if connected, false otherwise.
     */
    get connected(): boolean {
        return this.#connected;
    }

    /**
     * Observable that emits connection status changes.
     * @returns {Observable<boolean>} An observable that emits true when connected and false when disconnected.
     */
    get onConnectionChange(): Observable<boolean> {
        return this.#connectionSubject.asObservable();
    }

    /**
     * Emits a message to the WebSocket server.
     * @param {string} path - The path or event name.
     * @param {WebSocketMessage} data - The data to send.
     */
    emit(path: string, data: WebSocketMessage): void {
        this.#socket.emit(path, data);
    }

    /**
     * Listens for messages from the WebSocket server on a specific path.
     * @param {string} path - The path or event name to listen for.
     * @returns {Observable<WebSocketResponse>} An observable that emits WebSocket responses.
     */
    on(path: string): Observable<WebSocketResponse> {
        return this.#responseSubject.asObservable().pipe(
            filter((response) => response.type === path)
        );
    }
}
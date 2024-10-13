import type { Observable } from 'rxjs';

/**
 * Token used to identify the WebSocket client.
 */
export const WEB_SOCKET_CLIENT_TOKEN = Symbol('WEB_SOCKET_CLIENT_TOKEN');

/**
 * Type representing a JSON object.
 */
export type JsonType = Record<string, any>;

/**
 * Enum representing the types of WebSocket data.
 */
export enum WebSocketDataType {
    binary = 'binary',
    json = 'json',
    plainText = 'plainText'
}

/**
 * Base interface for WebSocket responses.
 */
export interface BaseWebSocketResponse {
    /**
     * The type of the WebSocket data.
     */
    type: WebSocketDataType;
}

/**
 * Interface representing a plain text WebSocket response.
 */
export interface PlainTextWebSocketResponse extends BaseWebSocketResponse {
    /**
     * The type of the WebSocket data, which is always plainText.
     */
    type: WebSocketDataType.plainText;

    /**
     * The text content of the response.
     */
    text: string;
}

/**
 * Interface representing a JSON WebSocket response.
 */
export interface JsonWebSocketResponse extends BaseWebSocketResponse {
    /**
     * The type of the WebSocket data, which is always json.
     */
    type: WebSocketDataType.json;

    /**
     * The JSON content of the response.
     */
    json: JsonType;
}

/**
 * Interface representing a binary WebSocket response.
 */
export interface BinaryWebSocketResponse extends BaseWebSocketResponse {
    /**
     * The type of the WebSocket data, which is always binary.
     */
    type: WebSocketDataType.binary;

    /**
     * The binary content of the response.
     */
    binary: Uint8Array;
}

/**
 * Type representing any kind of WebSocket response.
 */
export type WebSocketResponse = PlainTextWebSocketResponse | JsonWebSocketResponse | BinaryWebSocketResponse;

/**
 * Base interface for WebSocket messages.
 */
export interface BaseWebSocketMessage {
    /**
     * The type of the WebSocket data.
     */
    type: WebSocketDataType;
}

/**
 * Interface representing a binary WebSocket message.
 */
export interface BinaryWebSocketMessage extends BaseWebSocketMessage {
    /**
     * The type of the WebSocket data, which is always binary.
     */
    type: WebSocketDataType.binary;

    /**
     * The binary content of the message.
     */
    binary: Uint8Array;
}

/**
 * Interface representing a JSON WebSocket message.
 */
export interface JsonWebSocketMessage extends BaseWebSocketMessage {
    /**
     * The type of the WebSocket data, which is always json.
     */
    type: WebSocketDataType.json;

    /**
     * The JSON content of the message.
     */
    json: JsonType;
}

/**
 * Interface representing a plain text WebSocket message.
 */
export interface PlainTextWebSocketMessage extends BaseWebSocketMessage {
    /**
     * The type of the WebSocket data, which is always plainText.
     */
    type: WebSocketDataType.plainText;

    /**
     * The text content of the message.
     */
    text: string;
}

/**
 * Type representing any kind of WebSocket message.
 */
export type WebSocketMessage = PlainTextWebSocketMessage | JsonWebSocketMessage | BinaryWebSocketMessage;

/**
 * Interface representing a WebSocket client.
 */
export interface IWebSocketClient {
    /**
     * Indicates whether the WebSocket is connected.
     */
    connected: boolean;

    /**
     * Observable that emits connection status changes.
     * @returns {Observable<boolean>} An observable that emits true when connected and false when disconnected.
     */
    onConnectionChange: Observable<boolean>;

    /**
     * Emits a message to the WebSocket server.
     * @param {string} path - The path or event name.
     * @param {WebSocketMessage} data - The data to send.
     */
    emit: (path: string, data: WebSocketMessage) => void;

    /**
     * Listens for messages from the WebSocket server on a specific path.
     * @param {string} path - The path or event name to listen for.
     * @returns {Observable<WebSocketResponse>} An observable that emits WebSocket responses.
     */
    on: (path: string) => Observable<WebSocketResponse>;
}
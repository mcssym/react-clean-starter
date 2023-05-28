import { type Observable } from 'rxjs';

export const WEB_SOCKET_CLIENT_TOKEN = Symbol('WEB_SOCKET_CLIENT_TOKEN')

export type JsonType = Record<string, any>;

export enum WebSocketDataType {
    binary = 'binary',
    json = 'json',
    plainText = 'plainText'
}

export interface BaseWebSocketResponse {
    type: WebSocketDataType;
}

export interface PlainTextWebSocketResponse extends BaseWebSocketResponse {
    type: WebSocketDataType.plainText;
    text: string;
}

export interface JsonWebSocketResponse extends BaseWebSocketResponse {
    type: WebSocketDataType.json;
    json: JsonType;
}

export interface BinaryWebSocketResponse extends BaseWebSocketResponse {
    type: WebSocketDataType.binary;
    binary: Uint8Array;
}

export type WebSocketResponse = PlainTextWebSocketResponse | JsonWebSocketResponse | BinaryWebSocketResponse;

export interface BaseWebSocketMessage {
    type: WebSocketDataType;
}

export interface BinaryWebSocketMessage extends BaseWebSocketMessage {
    type: WebSocketDataType.binary;
    binary: Uint8Array;
}

export interface JsonWebSocketMessage extends BaseWebSocketMessage {
    type: WebSocketDataType.json;
    json: JsonType;
}

export interface PlainTextWebSocketMessage extends BaseWebSocketMessage {
    type: WebSocketDataType.plainText;
    text: string;
}

export type WebSocketMessage = PlainTextWebSocketMessage | JsonWebSocketMessage | BinaryWebSocketMessage;

export interface IWebSocketClient {
    connected: boolean;
    onConnectionChange: Observable<boolean>;
    emit: (path: string, data: WebSocketMessage) => void;
    on: (path: string) => Observable<WebSocketResponse>;
}

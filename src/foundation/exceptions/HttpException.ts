import { RuntimeException } from './RuntimeException';

export class HttpException extends RuntimeException {
    constructor(public readonly statusCode: number, public readonly response: unknown, name?: string, message?: string) {
        super(name ?? 'HttpException', message);
    }
}

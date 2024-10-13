import { RuntimeException } from './runtime.exception';

export class HttpException extends RuntimeException {
    constructor(public readonly statusCode: number, public readonly response: unknown, message?: string, name?: string) {
        super(name ?? 'HttpException', message);
    }
}

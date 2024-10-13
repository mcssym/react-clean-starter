export default class Logger {
    static readonly default = new Logger('Default');

    constructor(readonly name: string) { }

    log(message: string, ...args: unknown[]): void {
        console.log(message, ...args);
    }

    error(message: string, ...args: unknown[]): void {
        console.error(message, ...args);
    }

    warn(message: string, ...args: unknown[]): void {
        console.warn(message, ...args);
    }
}
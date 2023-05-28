export abstract class RuntimeException extends Error {
    constructor(name: string, message?: string, cause?: unknown) {
        super(message, {
            cause
        });

        this.name = name;
    }
}

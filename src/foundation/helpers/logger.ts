/**
 * Logger class for logging messages with different severity levels.
 */
export default class Logger {
    /**
     * Default logger instance with the name 'Default'.
     */
    static readonly default = new Logger('Default');

    /**
     * Constructor for the Logger class.
     * @param {string} name - The name of the logger.
     */
    constructor(readonly name: string) { }

    /**
     * Logs a message with optional additional arguments.
     * @param {string} message - The message to log.
     * @param {...unknown[]} args - Additional arguments to log.
     */
    log(message: string, ...args: unknown[]): void {
        console.log(`[${this.name}] ${message}`, ...args);
    }

    /**
     * Logs an error message with optional additional arguments.
     * @param {string} message - The error message to log.
     * @param {...unknown[]} args - Additional arguments to log.
     */
    error(message: string, ...args: unknown[]): void {
        console.error(`[${this.name}] ${message}`, ...args);
    }

    /**
     * Logs a warning message with optional additional arguments.
     * @param {string} message - The warning message to log.
     * @param {...unknown[]} args - Additional arguments to log.
     */
    warn(message: string, ...args: unknown[]): void {
        console.warn(`[${this.name}] ${message}`, ...args);
    }
}
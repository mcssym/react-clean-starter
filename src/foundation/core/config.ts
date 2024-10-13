import type { NullableUnless, Nullable } from '@foundation/supports/types';

/**
 * Symbol representing the application name key.
 */
export const AC_APP_NAME_KEY = Symbol('REACT_APP_APP_NAME');

/**
 * Symbol representing the application description key.
 */
export const AC_APP_DESCRIPTION_KEY = Symbol('REACT_APP_APP_DESCRIPTION');

/**
 * Symbol representing the application version key.
 */
export const AC_APP_VERSION_KEY = Symbol('REACT_APP_APP_VERSION');

/**
 * Symbol representing the API base URL key.
 */
export const AC_API_BASE_URL = Symbol('REACT_APP_API_BASE_URL');

/**
 * Symbol representing the API environment key.
 */
export const AC_API_ENV = Symbol('REACT_APP_ENV');

const NOMINAL = Symbol('NOMINAL');

/**
 * Class for managing application configuration.
 */
export class Config {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the Config class.
     */
    static readonly token: symbol = Symbol(Config.name);

    /**
     * Retrieves a configuration value by key, or returns a default value if not found.
     * @param {symbol} key - The key of the configuration value.
     * @param {string} [defaultValue] - The default value to return if the key is not found.
     * @returns {NullableUnless<string, typeof defaultValue>} The configuration value or the default value.
     */
    getOr(key: symbol, defaultValue?: string): NullableUnless<string, typeof defaultValue> {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                return value;
            }
        }
        return defaultValue ?? null;
    }

    /**
     * Retrieves a configuration value by key, or throws an error if not found.
     * @param {symbol} key - The key of the configuration value.
     * @param {string} [defaultValue] - The default value to return if the key is not found.
     * @returns {string} The configuration value.
     * @throws {Error} If the key is not found and no default value is provided.
     */
    get(key: symbol, defaultValue?: string): string {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                return value;
            }
        }

        if (defaultValue != null) {
            return defaultValue;
        }

        throw new Error(`Config key ${key.description} is not found`);
    }

    /**
     * Retrieves a numeric configuration value by key, or returns a default value if not found.
     * @param {symbol} key - The key of the configuration value.
     * @param {number} [defaultValue] - The default value to return if the key is not found.
     * @returns {Nullable<number>} The numeric configuration value or the default value.
     */
    getNumberOr(key: symbol, defaultValue?: number): Nullable<number> {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                const numberValue = value.includes('.') ? parseFloat(value) : parseInt(value);
                if (!isNaN(numberValue)) {
                    return numberValue;
                }
            }
        }
        return defaultValue ?? null;
    }

    /**
     * Retrieves a boolean configuration value by key, or returns a default value if not found.
     * @param {symbol} key - The key of the configuration value.
     * @param {boolean} [defaultValue] - The default value to return if the key is not found.
     * @returns {Nullable<boolean>} The boolean configuration value or the default value.
     */
    getBooleanOr(key: symbol, defaultValue?: boolean): Nullable<boolean> {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                if (['true', 'false'].includes(value)) {
                    return value === 'true';
                } else {
                    return Boolean(value);
                }
            }
        }
        return defaultValue ?? null;
    }

    /**
     * Checks if the current environment is production.
     * @returns {boolean} True if the environment is production, false otherwise.
     */
    isProduction(): boolean {
        return this.getOr(AC_API_ENV, 'development') === 'production';
    }

    /**
     * Gets the application name.
     * @returns {string} The application name.
     */
    get appName(): string {
        return this.get(AC_APP_NAME_KEY);
    }
}
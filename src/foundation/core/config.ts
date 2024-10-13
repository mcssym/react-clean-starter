import type { NullableUnless, Nullable } from '@foundation/supports/types';

export const AC_APP_NAME_KEY = Symbol('REACT_APP_APP_NAME');
export const AC_APP_DESCRIPTION_KEY = Symbol('REACT_APP_APP_DESCRIPTION');
export const AC_APP_VERSION_KEY = Symbol('REACT_APP_APP_VERSION');
export const AC_API_BASE_URL = Symbol('REACT_APP_API_BASE_URL');
export const AC_API_ENV = Symbol('REACT_APP_ENV');

const NOMINAL = Symbol('NOMINAL');
export class Config {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol(Config.name);

    getOr(key: symbol, defaultValue?: string): NullableUnless<string, typeof defaultValue> {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                return value;
            }
        }
        return defaultValue ?? null;
    }

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

    isProduction(): boolean {
        return this.getOr(AC_API_ENV, 'development') === 'production';
    }

    get appName(): string {
        return this.get(AC_APP_NAME_KEY);
    }
}

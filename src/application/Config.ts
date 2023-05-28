import { type Nullable } from 'foundation/supports/types';

export const AC_APP_NAME_KEY = Symbol('REACT_APP_APP_NAME');
export const AC_APP_DESCRIPTION_KEY = Symbol('REACT_APP_APP_DESCRIPTION');

const NOMINAL = Symbol('NOMINAL');
export class Config {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol(Config.name);

    getOr(key: symbol, defaultValue?: string): Nullable<string> {
        if (key.description !== undefined) {
            const value = process.env[key.description];
            if (value != null) {
                return value;
            }
        }
        return defaultValue ?? null;
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
}

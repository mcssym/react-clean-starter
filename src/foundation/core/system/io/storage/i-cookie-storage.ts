import type { Nullable } from '@foundation/supports/types';

export const COOKIE_STORAGE_TOKEN = Symbol('COOKIE_STORAGE_TOKEN');

export interface ICookieStorage {
    get: (key: string) => Promise<Nullable<string>>;
    set: (key: string, value: string) => Promise<void>;
    remove: (key: string) => Promise<void>;
}


import type { ICookieStorage } from '@foundation/core/system/io/storage/i-cookie-storage';
import type { Nullable } from '@foundation/supports/types';
import Cookies from 'js-cookie';

const NOMINAL = Symbol('CookieStorageService');

export class CookieStorageService implements ICookieStorage {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('CookieStorageService');

    async get(key: string): Promise<Nullable<string>> {
        return await Promise.resolve(Cookies.get(key) ?? null);
    }

    async set(key: string, value: string): Promise<void> {
        Cookies.set(key, value);
    }

    async remove(key: string): Promise<void> {
        Cookies.remove(key);
    }
}

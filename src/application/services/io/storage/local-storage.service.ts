
import type { Nullable } from '@foundation/supports/types';
import type { ILocalStorage } from '@foundation/core/system/io/storage/i-local-storage';

const NOMINAL = Symbol('LocalStorageService');

export class LocalStorageService implements ILocalStorage {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('LocalStorageService');

    async get(key: string): Promise<Nullable<string>> {
        return await Promise.resolve(localStorage.getItem(key) ?? null);
    }

    async set(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    }

    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
}

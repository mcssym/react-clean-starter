
import { type Nullable } from 'foundation/supports/types';
import { type ILocalStorage } from 'foundation/core/system/io/storage/ILocalStorage';

const NOMINAL = Symbol('SessionStorageService');

export class SessionStorageService implements ILocalStorage {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('SessionStorageService');

    async get(key: string): Promise<Nullable<string>> {
        return await Promise.resolve(sessionStorage.getItem(key) ?? null);
    }

    async set(key: string, value: string): Promise<void> {
        sessionStorage.setItem(key, value);
    }

    async remove(key: string): Promise<void> {
        sessionStorage.removeItem(key);
    }
}

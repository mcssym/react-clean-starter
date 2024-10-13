
import type { ICookieStorage } from '@foundation/core/system/io/storage/i-cookie-storage';
import type { ILocalStorage } from '@foundation/core/system/io/storage/i-local-storage';
import type { Nullable } from '@foundation/supports/types';

const NOMINAL = Symbol('AppStoragesService');

export class AppStoragesService {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('AppStoragesService');

    constructor(private readonly cookie: ICookieStorage, private readonly local: ILocalStorage, private readonly session: ILocalStorage) { }

    async get(key: string): Promise<Nullable<string>> {
        return await Promise.any<Nullable<string>>([
            this.cookie.get(key),
            this.local.get(key),
            this.session.get(key),
        ]);
    }

    async set(key: string, value: string): Promise<void> {
        void Promise.allSettled([
            this.cookie.set(key, value),
            this.local.set(key, value),
            this.session.set(key, value),
        ]);
    }

    async remove(key: string): Promise<void> {
        void Promise.allSettled([
            this.cookie.remove(key),
            this.local.remove(key),
            this.session.remove(key),
        ]);
    }
}

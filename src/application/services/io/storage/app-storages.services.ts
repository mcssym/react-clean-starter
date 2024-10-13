import type { ICookieStorage } from '@foundation/core/system/io/storage/i-cookie-storage';
import type { ILocalStorage } from '@foundation/core/system/io/storage/i-local-storage';
import type { Nullable } from '@foundation/supports/types';

/**
 * Symbol used to identify the AppStoragesService.
 */
const NOMINAL = Symbol('AppStoragesService');

/**
 * Service class for managing application storage across different storage mechanisms.
 */
export class AppStoragesService {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the AppStoragesService.
     */
    static readonly token: symbol = Symbol('AppStoragesService');

    /**
     * Constructor for AppStoragesService.
     * @param {ICookieStorage} cookie - The cookie storage instance.
     * @param {ILocalStorage} local - The local storage instance.
     * @param {ILocalStorage} session - The session storage instance.
     */
    constructor(
        private readonly cookie: ICookieStorage,
        private readonly local: ILocalStorage,
        private readonly session: ILocalStorage
    ) { }

    /**
     * Retrieves a value from the storage by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the value or null if not found.
     */
    async get(key: string): Promise<Nullable<string>> {
        return await Promise.any<Nullable<string>>([
            this.cookie.get(key),
            this.local.get(key),
            this.session.get(key),
        ]);
    }

    /**
     * Sets a value in the storage for the given key.
     * @param {string} key - The key of the value to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
    async set(key: string, value: string): Promise<void> {
        void Promise.allSettled([
            this.cookie.set(key, value),
            this.local.set(key, value),
            this.session.set(key, value),
        ]);
    }

    /**
     * Removes a value from the storage by key.
     * @param {string} key - The key of the value to remove.
     * @returns {Promise<void>} A promise that resolves when the value is removed.
     */
    async remove(key: string): Promise<void> {
        void Promise.allSettled([
            this.cookie.remove(key),
            this.local.remove(key),
            this.session.remove(key),
        ]);
    }
}
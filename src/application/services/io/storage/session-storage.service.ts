import type { Nullable } from '@foundation/supports/types';
import type { ILocalStorage } from '@foundation/core/system/io/storage/i-local-storage';

/**
 * Symbol used to identify the SessionStorageService.
 */
const NOMINAL = Symbol('SessionStorageService');

/**
 * Service class for managing session storage.
 */
export class SessionStorageService implements ILocalStorage {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the SessionStorageService.
     */
    static readonly token: symbol = Symbol('SessionStorageService');

    /**
     * Retrieves a value from the session storage by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the value or null if not found.
     */
    async get(key: string): Promise<Nullable<string>> {
        return await Promise.resolve(sessionStorage.getItem(key) ?? null);
    }

    /**
     * Sets a value in the session storage for the given key.
     * @param {string} key - The key of the value to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
    async set(key: string, value: string): Promise<void> {
        sessionStorage.setItem(key, value);
    }

    /**
     * Removes a value from the session storage by key.
     * @param {string} key - The key of the value to remove.
     * @returns {Promise<void>} A promise that resolves when the value is removed.
     */
    async remove(key: string): Promise<void> {
        sessionStorage.removeItem(key);
    }
}
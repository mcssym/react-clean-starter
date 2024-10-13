import type { Nullable } from '@foundation/supports/types';
import type { ILocalStorage } from '@foundation/core/system/io/storage/i-local-storage';

/**
 * Symbol used to identify the LocalStorageService.
 */
const NOMINAL = Symbol('LocalStorageService');

/**
 * Service class for managing local storage.
 */
export class LocalStorageService implements ILocalStorage {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the LocalStorageService.
     */
    static readonly token: symbol = Symbol('LocalStorageService');

    /**
     * Retrieves a value from the local storage by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the value or null if not found.
     */
    async get(key: string): Promise<Nullable<string>> {
        return await Promise.resolve(localStorage.getItem(key) ?? null);
    }

    /**
     * Sets a value in the local storage for the given key.
     * @param {string} key - The key of the value to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
    async set(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    }

    /**
     * Removes a value from the local storage by key.
     * @param {string} key - The key of the value to remove.
     * @returns {Promise<void>} A promise that resolves when the value is removed.
     */
    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
}
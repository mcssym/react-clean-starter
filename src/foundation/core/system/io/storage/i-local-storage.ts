import type { Nullable } from '@foundation/supports/types';

/**
 * Token used to identify the local storage service.
 */
export const LOCAL_STORAGE_TOKEN = Symbol('LOCAL_STORAGE_TOKEN');

/**
 * Interface representing a local storage service.
 */
export interface ILocalStorage {
    /**
     * Retrieves a value from the local storage by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the value or null if not found.
     */
    get: (key: string) => Promise<Nullable<string>>;

    /**
     * Sets a value in the local storage for the given key.
     * @param {string} key - The key of the value to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
    set: (key: string, value: string) => Promise<void>;

    /**
     * Removes a value from the local storage by key.
     * @param {string} key - The key of the value to remove.
     * @returns {Promise<void>} A promise that resolves when the value is removed.
     */
    remove: (key: string) => Promise<void>;
}
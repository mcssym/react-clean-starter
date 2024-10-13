import type { Nullable } from '@foundation/supports/types';

/**
 * Token used to identify the cookie storage service.
 */
export const COOKIE_STORAGE_TOKEN = Symbol('COOKIE_STORAGE_TOKEN');

/**
 * Interface representing a cookie storage service.
 */
export interface ICookieStorage {
    /**
     * Retrieves a value from the cookie storage by key.
     * @param {string} key - The key of the value to retrieve.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the value or null if not found.
     */
    get: (key: string) => Promise<Nullable<string>>;

    /**
     * Sets a value in the cookie storage for the given key.
     * @param {string} key - The key of the value to set.
     * @param {string} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value is set.
     */
    set: (key: string, value: string) => Promise<void>;

    /**
     * Removes a value from the cookie storage by key.
     * @param {string} key - The key of the value to remove.
     * @returns {Promise<void>} A promise that resolves when the value is removed.
     */
    remove: (key: string) => Promise<void>;
}
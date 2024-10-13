/**
 * Interface representing a translation provider.
 */
export interface ITranslationProvider {
    /**
     * Translates a singular key.
     * @param {string} key - The key to translate.
     * @param {Record<string, string>} [params] - Optional parameters for the translation.
     * @returns {string} The translated string.
     */
    singular: (key: string, params?: Record<string, string>) => string;

    /**
     * Translates a plural key.
     * @param {string} key - The key to translate.
     * @param {number} count - The count for pluralization.
     * @param {Record<string, string>} [params] - Optional parameters for the translation.
     * @returns {string} The translated string.
     */
    plural: (key: string, count: number, params?: Record<string, string>) => string;
}

/**
 * Exporting TranslationKeys from the translation-keys module.
 */
export { TranslationKeys } from './translation-keys';
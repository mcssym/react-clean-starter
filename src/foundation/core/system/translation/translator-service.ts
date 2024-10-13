import type { ITranslationProvider } from './i-translation-provider';

/**
 * Token used to identify the TranslatorService.
 */
export const TRANSLATOR_SERVICE_TOKEN = Symbol('TRANSLATOR_SERVICE_TOKEN');

const NOMINAL = Symbol('TranslatorService');

/**
 * Abstract class representing a translation service.
 */
export abstract class TranslatorService implements ITranslationProvider {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Translates a singular key.
     * @param {string} key - The key to translate.
     * @param {Record<string, string>} [params] - Optional parameters for the translation.
     * @returns {string} The translated string.
     */
    singular(key: string, params?: Record<string, string>): string {
        return this.of().singular(key, params);
    }

    /**
     * Translates a plural key.
     * @param {string} key - The key to translate.
     * @param {number} count - The count for pluralization.
     * @param {Record<string, string>} [params] - Optional parameters for the translation.
     * @returns {string} The translated string.
     */
    plural(key: string, count: number, params?: Record<string, string>): string {
        return this.of().plural(key, count, params);
    }

    /**
     * Provides a translation provider for a specific namespace and locale.
     * @param {string} [namespace] - The namespace for the translations.
     * @param {string} [locale] - The locale for the translations.
     * @returns {ITranslationProvider} The translation provider.
     */
    abstract of(namespace?: string, locale?: string): ITranslationProvider;

    /**
     * Gets the current locale.
     * @returns {string} The current locale.
     */
    abstract get locale(): string;

    /**
     * Changes the current locale.
     * @param {string} locale - The new locale.
     */
    abstract changeLocale(locale: string): void;
}
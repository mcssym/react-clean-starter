import type { StringMap, TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

/**
 * Type representing a translator function.
 * @param {string} key - The key to translate.
 * @param {TOptions<StringMap>} [options] - Optional translation options.
 * @returns {string} The translated string.
 */
export type Translator = (key: string, options?: TOptions<StringMap>) => string;

/**
 * Custom hook for using i18n translations.
 * @param {string} [namespace] - Optional namespace for the translations.
 * @returns {Translator} The translator function.
 */
export const useI18n = (namespace?: string): Translator => {
    const { t } = useTranslation(namespace);

    return (key: string, options?: TOptions<StringMap>) => (options != null ? t(key, options) : t(key)) ?? key;
};
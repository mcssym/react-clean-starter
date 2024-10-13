import type { StringMap, TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';

export type Translator = (key: string, options?: TOptions<StringMap>) => string;

export const useI18n = (namespace?: string): Translator => {
    const { t } = useTranslation(namespace);

    return (key: string, options?: TOptions<StringMap>) => (options != null ? t(key, options) : t(key)) ?? key;
}

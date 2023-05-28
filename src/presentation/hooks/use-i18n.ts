import { useTranslation } from 'react-i18next';

export type Translator = (key: string) => string;

export const useI18n = (namespace?: string): Translator => {
    const { t } = useTranslation(namespace);

    return (key: string) => t(key) ?? key;
}

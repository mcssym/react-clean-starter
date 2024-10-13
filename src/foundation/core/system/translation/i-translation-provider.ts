export interface ITranslationProvider {
    singular: (key: string, params?: Record<string, string>) => string;
    plural: (key: string, count: number, params?: Record<string, string>) => string;
}

export { TranslationKeys } from './translation-keys';
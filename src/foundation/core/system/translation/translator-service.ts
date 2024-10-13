import type { ITranslationProvider } from './i-translation-provider';

export const TRANSLATOR_SERVICE_TOKEN = Symbol('TRANSLATOR_SERVICE_TOKEN');

const NOMINAL = Symbol('TranslatorService');
export abstract class TranslatorService implements ITranslationProvider {
    [NOMINAL]: symbol = NOMINAL;

    singular(key: string, params?: Record<string, string>  ): string {
        return this.of().singular(key, params);
    }

    plural(key: string, count: number, params?: Record<string, string>  ): string {
        return this.of().plural(key, count, params);
    }

    abstract of(namespace?: string, locale?: string): ITranslationProvider;

    abstract get locale(): string;

    abstract changeLocale(locale: string): void;
}

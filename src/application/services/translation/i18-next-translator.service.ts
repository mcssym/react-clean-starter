
import type { ICookieStorage } from '@foundation/core/system/io/storage/i-cookie-storage';
import type { ITranslationProvider } from '@foundation/core/system/translation/i-translation-provider';
import { TranslatorService } from '@foundation/core/system/translation/translator-service';
import type { Nullable } from '@foundation/supports/types';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next);

const COOKIE_LOCALE_KEY = 'APP_LOCALE';

export enum Locales {
    en = 'en',
};

export enum LocaleNamespace {
    common = 'common',
};

const NOMINAL = Symbol('I18NextTranslatorService');

export class I18NextTranslatorService extends TranslatorService {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('I18NextTranslatorService');

    readonly #cookieStorage: ICookieStorage;

    constructor(cookieStorage: ICookieStorage) {
        super();
        this.#cookieStorage = cookieStorage;
    }

    override of(namespace?: string, locale?: string): ITranslationProvider {
        return {
            singular: (key: string, params?: Record<string, string>) => {
                return i18n.t(key, {
                    ...(params ?? {}),
                    ns: namespace,
                    lng: locale,
                });
            },
            plural: (key: string, count: number, params?: Record<string, string>) => {
                return i18n.t(key, {
                    ...(params ?? {}),
                    count,
                    ns: namespace,
                    lng: locale,
                });
            },
        }
    }

    override get locale(): string {
        return i18n.language;
    }

    override changeLocale(locale: string): void {
        i18n.changeLanguage(locale).catch(() => { });
        this.#setCookie(locale);
    }

    async initialize(): Promise<void> {
        const locale = await this.#getCookie();
        await i18n.init({
            ns: Object.values(LocaleNamespace),
            defaultNS: LocaleNamespace.common,
            fallbackNS: LocaleNamespace.common,
            fallbackLng: Locales.en,
            supportedLngs: Object.values(Locales),
            lng: locale ?? undefined,
            //debug: process.env.NODE_ENV === 'development',
            debug: false,
            backend: {
                // for all available options read the backend's repository readme file
                loadPath: '/assets/translations/{{lng}}/{{ns}}.json'
            },
            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
            }
        });
        if (locale == null) {
            this.#setCookie(i18n.language);
        }
    }

    #setCookie(locale: string): void {
        this.#cookieStorage.set(COOKIE_LOCALE_KEY, locale).catch(() => { });
    }

    async #getCookie(): Promise<Nullable<string>> {
        return await this.#cookieStorage.get(COOKIE_LOCALE_KEY);
    }
}

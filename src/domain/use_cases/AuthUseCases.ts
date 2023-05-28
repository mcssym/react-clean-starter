import { Routes } from 'domain/controllers/navigation/routes-provider';
import { User } from 'domain/entities/User';
import { type AuthManager } from 'domain/managers/AuthManager';
import { type NavigationService } from 'foundation/core/system/navigation/NavigationService';
import { uniqueId } from 'foundation/supports/helpers';
import { type IMemberProvider } from './contracts/MemberProvider';
import { type DialogService } from 'foundation/core/system/navigation/DialogService';
import { type TranslatorService } from 'foundation/core/system/translation/TranslatorService';
import { TranslationKeys } from 'foundation/core/system/translation/ITranslationProvider';
import { RuntimeException } from 'foundation/exceptions/RuntimeException';

export interface LoginData {
    name: string;
    username: string;
}

export const AUTH_USE_CASES_TOKEN = Symbol('AUTH_USE_CASES_TOKEN');

export interface IAuthUseCases {
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
}

export class LogoutDeclinedException extends RuntimeException {
    constructor() {
        super('LogoutDeclinedException')
    }
}

const NOMINAL = Symbol('NOMINAL(AuthUseCases)');
export class AuthUseCases implements IAuthUseCases {
    static readonly token: symbol = Symbol('AuthUseCases');

    [NOMINAL]: symbol = NOMINAL;

    readonly #authManager: AuthManager;
    readonly #memberProvider: IMemberProvider;
    readonly #navigation: NavigationService;
    readonly #dialog: DialogService;
    readonly #translator: TranslatorService;

    constructor(memberProvider: IMemberProvider, authManager: AuthManager, navigation: NavigationService, dialog: DialogService, translator: TranslatorService) {
        this.#authManager = authManager;
        this.#memberProvider = memberProvider;
        this.#navigation = navigation;
        this.#dialog = dialog;
        this.#translator = translator;
    }

    async login(data: LoginData): Promise<void> {
        const user = new User({
            id: uniqueId('user--'),
            name: data.name,
            username: data.username
        });
        this.#authManager.authenticate(user);
        this.#memberProvider.addMember(user);

        this.#navigation.goTo(Routes.home.resolve(), true);
    }

    async logout(): Promise<void> {
        const confirmed = await this.#dialog.confirm({
            title: this.#translator.singular(TranslationKeys.logout),
            message: this.#translator.singular(TranslationKeys.logoutConfirmationMessage),
        });

        if (confirmed !== true) {
            throw new LogoutDeclinedException();
        }

        if (this.#authManager.state.user != null) {
            this.#memberProvider.removeMember(this.#authManager.state.user);
        }
        this.#authManager.reset();

        this.#navigation.goTo(Routes.logIn.resolve(), true);
    }
}

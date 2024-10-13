import { Routes } from '@application/controllers/navigation/routes-provider';
import type { AuthManager } from '@application/managers/auth.manager';
import type { AuthEndpoint } from '@data/resources/remote/http/endpoints/auth.endpoint';
import type { DialogService } from '@foundation/core/system/navigation/dialog-service';
import type { NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { TranslationKeys } from '@foundation/core/system/translation/i-translation-provider';
import type { TranslatorService } from '@foundation/core/system/translation/translator-service';
import { RuntimeException } from '@foundation/exceptions/runtime.exception';

export interface LoginData {
    name: string;
    username: string;
}


export class LogoutDeclinedException extends RuntimeException {
    constructor() {
        super('LogoutDeclinedException')
    }
}

const NOMINAL = Symbol('NOMINAL(LogoutUseCase)');
export class LogoutUseCase {
    static readonly token: symbol = Symbol('LogoutUseCase');

    [NOMINAL]: symbol = NOMINAL;

    readonly #authManager: AuthManager;
    //readonly #memberProvider: IMemberProvider;
    readonly #navigation: NavigationService;
    readonly #dialog: DialogService;
    readonly #translator: TranslatorService;
    readonly #authEndpoint: AuthEndpoint;

    constructor(params: { authEndpoint: AuthEndpoint, authManager: AuthManager, navigation: NavigationService, dialog: DialogService, translator: TranslatorService }) {
        this.#authManager = params.authManager;
        //this.#memberProvider = params.memberProvider;
        this.#navigation = params.navigation;
        this.#dialog = params.dialog;
        this.#translator = params.translator;
        this.#authEndpoint = params.authEndpoint;
    }

    async logout(): Promise<void> {
        const confirmed = await this.#dialog.confirm({
            title: this.#translator.singular(TranslationKeys.logout),
            message: this.#translator.singular(TranslationKeys.logoutConfirmationMessage),
        });

        if (confirmed !== true) {
            throw new LogoutDeclinedException();
        }

        void this.#authEndpoint.logout();

        if (this.#authManager.state.user != null) {
            // this.#memberProvider.removeMember(this.#authManager.state.user);
        }
        this.#authManager.reset();

        void this.#authEndpoint.logout();

        this.#navigation.goTo(Routes.auth.logIn.resolve(), true);
    }
}

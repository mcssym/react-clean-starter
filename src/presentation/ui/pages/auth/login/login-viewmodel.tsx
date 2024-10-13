
import { Routes } from '@application/controllers/navigation/routes-provider';
import { LoginData, LoginUseCase } from '@domain/use_cases/auth/login.use_case';
import { type DialogService } from '@foundation/core/system/navigation/dialog-service';
import { NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { ViewModel } from '@foundation/core/system/state/view-model';
import { TranslationKeys } from '@foundation/core/system/translation/i-translation-provider';
import { type TranslatorService } from '@foundation/core/system/translation/translator-service';
import { RuntimeException } from '@foundation/exceptions/runtime.exception';
import Logger from '@foundation/helpers/logger';
import { type PartialPropertiesOf } from '@foundation/supports/types';

export class LoginViewState {
    readonly submitting: boolean;

    constructor(data: PartialPropertiesOf<LoginViewState>) {
        this.submitting = data.submitting ?? false;
    }
}

export class LoginViewModel extends ViewModel<LoginViewState> {
    static readonly token = Symbol('LoginViewModel');

    readonly #logger = new Logger('LoginViewModel');

    readonly #useCase: LoginUseCase;
    readonly #translator: TranslatorService;
    readonly #dialog: DialogService;
    readonly #navigation: NavigationService;

    constructor(params: { useCase: LoginUseCase, dialog: DialogService, translator: TranslatorService, navigation: NavigationService }) {
        super(properties => new LoginViewState(properties));

        this.#useCase = params.useCase;
        this.#dialog = params.dialog;
        this.#translator = params.translator;
        this.#navigation = params.navigation;
    }

    async handleSubmit(data: LoginData): Promise<void> {
        this.copyState({
            submitting: true,
        });
        try {
            await this.#useCase.login(data);
        } catch (e) {
            const message = e instanceof RuntimeException ? e.message : this.#translator.singular(TranslationKeys.unknownError);
            this.#dialog.alert({
                message: message,
                title: this.#translator.singular(TranslationKeys.error)
            }).catch(() => { });

            this.#logger.error('Error on login', e);
        }
        this.copyState({
            submitting: false,
        });
    }

    goToRecover(): void {
        this.#navigation.goTo(Routes.auth.recover.resolve());
    }
}

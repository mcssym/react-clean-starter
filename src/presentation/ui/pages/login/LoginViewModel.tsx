import { type IAuthUseCases, type LoginData } from 'domain/use_cases/AuthUseCases';
import { type DialogService } from 'foundation/core/system/navigation/DialogService';
import { ViewModel } from 'foundation/core/system/state/ViewModel';
import { TranslationKeys } from 'foundation/core/system/translation/ITranslationProvider';
import { type TranslatorService } from 'foundation/core/system/translation/TranslatorService';
import { type PartialPropertiesOf } from 'foundation/supports/types';

export class LoginViewState {
    readonly submitting: boolean;

    constructor(data: PartialPropertiesOf<LoginViewState>) {
        this.submitting = data.submitting ?? false;
    }
}

export class LoginViewModel extends ViewModel<LoginViewState> {
    static readonly token = Symbol('LoginViewModel');

    readonly #useCase: IAuthUseCases;
    readonly #translator: TranslatorService;
    readonly #dialog: DialogService;

    constructor(useCase: IAuthUseCases, dialog: DialogService, translator: TranslatorService) {
        super(properties => new LoginViewState(properties));

        this.#useCase = useCase;
        this.#dialog = dialog;
        this.#translator = translator;
    }

    async handleSubmit(data: LoginData): Promise<void> {
        this.copyState({
            submitting: true,
        });
        try {
            await this.#useCase.login(data);
        } catch (e) {
            this.#dialog.alert({
                message: this.#translator.singular(TranslationKeys.unknownError),
                title: this.#translator.singular(TranslationKeys.error)
            }).catch(() => { });
        }
        this.copyState({
            submitting: false,
        });
    }
}

import { RecoverData, RecoverUseCase } from '@domain/use_cases/auth/recover.use_case';
import { type DialogService } from '@foundation/core/system/navigation/dialog-service';
import { ViewModel } from '@foundation/core/system/state/view-model';
import { TranslationKeys } from '@foundation/core/system/translation/i-translation-provider';
import { type TranslatorService } from '@foundation/core/system/translation/translator-service';
import { RuntimeException } from '@foundation/exceptions/runtime.exception';
import { type PartialPropertiesOf } from '@foundation/supports/types';

export class AuthRecoverViewState {
    readonly submitting: boolean;

    constructor(data: PartialPropertiesOf<AuthRecoverViewState>) {
        this.submitting = data.submitting ?? false;
    }
}

export class AuthRecoverViewModel extends ViewModel<AuthRecoverViewState> {
    static readonly token = Symbol('AuthRecoverViewModel');

    readonly #useCase: RecoverUseCase;
    readonly #translator: TranslatorService;
    readonly #dialog: DialogService;

    constructor(useCase: RecoverUseCase, dialog: DialogService, translator: TranslatorService) {
        super(properties => new AuthRecoverViewState(properties));

        this.#useCase = useCase;
        this.#dialog = dialog;
        this.#translator = translator;
    }

    async handleSubmit(data: RecoverData): Promise<void> {
        this.copyState({
            submitting: true,
        });
        try {
            await this.#useCase.recover(data);
        } catch (e) {
            const message = e instanceof RuntimeException ? e.message : this.#translator.singular(TranslationKeys.unknownError);
            this.#dialog.alert({
                message: message,
                title: this.#translator.singular(TranslationKeys.error)
            }).catch(() => { });
        }
        this.copyState({
            submitting: false,
        });
    }
}

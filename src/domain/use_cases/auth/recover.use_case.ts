import { Routes } from '@application/controllers/navigation/routes-provider';
import { RecoverDto } from '@data/resources/remote/http/dto/auth/recover.dto';
import type { IAuthEndpoint } from '@data/resources/remote/http/endpoints/auth.endpoint';
import type { DialogService } from '@foundation/core/system/navigation/dialog-service';
import type { NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import type { TranslatorService } from '@foundation/core/system/translation/translator-service';

export interface RecoverData {
    login: string;
}

const NOMINAL = Symbol('NOMINAL(RecoverUseCase)');
export class RecoverUseCase {
    static readonly token: symbol = Symbol('RecoverUseCase');

    [NOMINAL]: symbol = NOMINAL;

    readonly #navigation: NavigationService;
    readonly #authEndpoint: IAuthEndpoint;
    readonly #dialog: DialogService;
    readonly #translator: TranslatorService;

    constructor(params: { dialogService: DialogService, translatorService: TranslatorService, navigation: NavigationService, authEndpoint: IAuthEndpoint, }) {
        this.#authEndpoint = params.authEndpoint;
        this.#navigation = params.navigation;
        this.#dialog = params.dialogService;
        this.#translator = params.translatorService;
    }

    async recover(data: RecoverData): Promise<void> {
        await this.#authEndpoint.recover(new RecoverDto({
            login: data.login,
        }));

        await this.#dialog.alert({
            message: this.#translator.singular(TranslationKeys.recoverConfirmationMessage),
            title: this.#translator.singular(TranslationKeys.recoverConfirmationTitle),
        });

        this.#navigation.goTo(Routes.auth.logIn.resolve(), true);
    }
}

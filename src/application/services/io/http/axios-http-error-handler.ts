import { HttpStatusCode, type AxiosError } from 'axios';
import { HttpException } from '@foundation/exceptions/http.exception';
import type { TranslatorService } from '@foundation/core/system/translation/translator-service';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';

export const AXIOS_HTTP_ERROR_HANDLER_TOKEN = Symbol('AXIOS_HTTP_ERROR_HANDLER_TOKEN')
export interface IAxiosHttpErrorHandler {
    handle: (error: AxiosError) => HttpException;
}

export default class AxiosHttpErrorHandler implements IAxiosHttpErrorHandler {
    readonly #translator: TranslatorService;

    constructor(translator: TranslatorService) {
        this.#translator = translator;
    }

    handle(error: AxiosError<unknown, any>): HttpException {
        let translatedErrorKey: string | null = null;
        switch (error.response?.status) {
            case HttpStatusCode.NotFound:
                translatedErrorKey = 'error_404'
                break;
            case HttpStatusCode.Forbidden:
                translatedErrorKey = 'error_403'
                break;
            case HttpStatusCode.Unauthorized:
                translatedErrorKey = 'error_401'
                break;
            case HttpStatusCode.ServiceUnavailable:
                translatedErrorKey = 'error_503'
                break;
            case HttpStatusCode.InternalServerError:
                translatedErrorKey = 'error_500'
                break;
        }
        let message: string = this.#translator.singular(TranslationKeys.errorConnection);
        if (translatedErrorKey != null) {
            message = this.#translator.singular(translatedErrorKey);
        }

        const data = error.response?.data;
        message = this.#handleErrorCodeInData(data, message);

        return new HttpException(error.response?.status ?? 400, error.response?.data, message);
    }

    #handleErrorCodeInData(data: any, defaultMessage: string): string {
        if (data != null) {
            const jsonData = JSON.parse(data as string);
            if (jsonData.code != null) {
                return this.#errorCodeToMessage(jsonData.code as string, defaultMessage);
            }
        }

        return defaultMessage;
    }

    #errorCodeToMessage(code: string, defaultMessage: string): string {
        switch (code) {
            case 'UserBlockedException':
                return this.#translator.singular(TranslationKeys.exceptionUserBlocked);
            case 'InactiveUserException':
                return this.#translator.singular(TranslationKeys.exceptionUserInactive);
            case 'InvalidInstallationException':
                return this.#translator.singular(TranslationKeys.exceptionInstallationInvalid);
            case 'PasswordInvalidException':
                return this.#translator.singular(TranslationKeys.exceptionPasswordInvalid);
            case 'UnknownInstallationException':
                return this.#translator.singular(TranslationKeys.exceptionInstallationInvalid);
            case 'UserActivationException':
                return this.#translator.singular(TranslationKeys.exceptionUserActivation);
            case 'InvalidUserActivationException':
                return this.#translator.singular(TranslationKeys.exceptionUserActivationInvalid);
            case 'TimeoutUserActivationException':
                return this.#translator.singular(TranslationKeys.exceptionUserActivationTimeout);
            case 'InvalidUserActivationCodeException':
                return this.#translator.singular(TranslationKeys.exceptionUserActivationInvalid);
            case 'UserAlreadyExistsException':
                return this.#translator.singular(TranslationKeys.exceptionUserAlreadyExists);
            case 'UserForbiddenException':
                return this.#translator.singular(TranslationKeys.exceptionUserForbidden);
            case 'UserNotFoundException':
                return this.#translator.singular(TranslationKeys.exceptionUserNotFound);
            default:
                return defaultMessage;
        }
    }
}

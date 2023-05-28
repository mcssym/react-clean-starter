import { HttpStatusCode, type AxiosError } from 'axios';
import { HttpException } from 'foundation/exceptions/HttpException';
import { type TranslatorService } from 'foundation/core/system/translation/TranslatorService';

export const AXIOS_HTTP_ERROR_HANDLER_TOKEN = Symbol('AXIOS_HTTP_ERROR_HANDLER_TOKEN')
export interface IAxiosHttpErrorHandler {
    handle: (error: AxiosError) => HttpException;
}

export default class AxiosHttpErrorHandler implements IAxiosHttpErrorHandler {
    #translator: TranslatorService;

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
        let message: string = '';
        if (translatedErrorKey != null) {
            message = this.#translator.singular(translatedErrorKey);
        }

        return new HttpException(error.response?.status ?? 400, error.response?.data, message);
    }
}

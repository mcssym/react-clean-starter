
import { HttpException } from './http.exception';

export class UnprocessableFieldsException extends HttpException {
    readonly fields: Record<string, string>

    constructor(fields: Record<string, string>, message?: string) {
        super(522, { fields }, message, 'UnprocessableFieldsException');

        this.fields = fields;
    }
}

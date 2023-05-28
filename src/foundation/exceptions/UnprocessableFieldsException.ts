
import { HttpException } from './HttpException';

export class UnprocessableFieldsException extends HttpException {
    readonly fields: Record<string, string>

    constructor(fields: Record<string, string>, message?: string) {
        super(522, { fields }, 'UnprocessableFieldsException', message);

        this.fields = fields;
    }
}

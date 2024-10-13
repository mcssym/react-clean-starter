import { Expose, instanceToPlain } from 'class-transformer';
import type { PropertiesOf } from '@foundation/supports/types';

const NOMINAL = Symbol('RecoverDto');

export class RecoverDto {
    [NOMINAL]: symbol = NOMINAL;
    @Expose()
    readonly login: string;

    constructor(data: PropertiesOf<RecoverDto>) {
        this.login = data.login;
    }

    toData(): Record<string, any> {
        return instanceToPlain(this, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        })
    }
}

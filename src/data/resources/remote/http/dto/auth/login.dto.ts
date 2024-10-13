import { Expose, instanceToPlain } from 'class-transformer';
import type { PropertiesOf } from '@foundation/supports/types';

const NOMINAL = Symbol('LoginDto');

export class LoginDto {
    [NOMINAL]: symbol = NOMINAL;
    @Expose()
    readonly login: string;

    @Expose()
    readonly password: string;

    constructor(data: PropertiesOf<LoginDto>) {
        this.login = data.login;
        this.password = data.password;
    }

    toData(): Record<string, any> {
        return instanceToPlain(this, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        })
    }
}

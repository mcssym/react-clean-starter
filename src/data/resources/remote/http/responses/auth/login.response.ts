import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer';
import type { PropertiesOf } from '@foundation/supports/types';

export class LoginResponseData {
    @Expose({ name: 't' })
    public readonly token!: string;

    constructor(data: PropertiesOf<LoginResponseData>) {
        Object.assign(this, data);
    }
}
export class LoginResponse {
    @Type(() => LoginResponseData)
    @Expose({ name: 'd' })
    public readonly data!: LoginResponseData;

    constructor(data: PropertiesOf<LoginResponse>) {
        Object.assign(this, data);
    }

    static fromJson(data: Record<string, unknown>): LoginResponse {
        return plainToInstance(LoginResponse, data);
    }

    static fromJsonArray(data: Array<Record<string, unknown>>): LoginResponse[] {
        return plainToInstance(LoginResponse, data) as unknown as LoginResponse[];
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this);
    }
}

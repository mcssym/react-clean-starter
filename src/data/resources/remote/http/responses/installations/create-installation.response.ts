import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer';
import type { PropertiesOf } from '@foundation/supports/types';

export class CreateInstallationResponseData {
    @Expose({ name: 'ui' })
    public readonly uuid!: string;

    constructor(data: PropertiesOf<CreateInstallationResponseData>) {
        Object.assign(this, data);
    }
}

export class CreateInstallationResponse {
    @Type(() => CreateInstallationResponseData)
    @Expose({ name: 'd' })
    public readonly data!: CreateInstallationResponseData;

    constructor(data: PropertiesOf<CreateInstallationResponse>) {
        Object.assign(this, data);
    }

    static fromJson(data: Record<string, unknown>): CreateInstallationResponse {
        return plainToInstance(CreateInstallationResponse, data);
    }

    static fromJsonArray(data: Array<Record<string, unknown>>): CreateInstallationResponse[] {
        return plainToInstance(CreateInstallationResponse, data) as unknown as CreateInstallationResponse[];
    }

    toJson(): Record<string, unknown> {
        return instanceToPlain(this);
    }
}

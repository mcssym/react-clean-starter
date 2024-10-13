import { Expose, instanceToPlain } from 'class-transformer';
import type { PropertiesOf } from '@foundation/supports/types';

const NOMINAL = Symbol('UpdateInstallationDto');

export class UpdateInstallationDto {
    [NOMINAL]: symbol = NOMINAL;

    @Expose({ name: 'app_version' })
    readonly appVersion?: string;

    @Expose({ name: 'device_os' })
    readonly deviceOs?: string;

    @Expose({ name: 'device_os_version' })
    readonly deviceOsVersion?: string;

    constructor(data: PropertiesOf<UpdateInstallationDto>) {
        Object.assign(this, data);
    }

    toData(): Record<string, any> {
        return instanceToPlain(this, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        })
    }
}

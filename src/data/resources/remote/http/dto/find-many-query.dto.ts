import type { PartialPropertiesOf } from '@foundation/supports/types';
import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';

const NOMINAL = Symbol('FindManyDto');

export class FindManyDto {
    [NOMINAL]: symbol = NOMINAL;

    @Expose({ name: 'page' })
    readonly page: number;

    @Expose({ name: 'per_page' })
    readonly perPage: number;

    constructor(data?: PartialPropertiesOf<FindManyDto>) {
        this.page = data?.page ?? 1;
        this.perPage = data?.perPage ?? 16;
    }

    toData(): Record<string, any> {
        return instanceToPlain(this, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        })
    }

    static parse(data: Record<string, unknown>): FindManyDto {
        return plainToInstance(FindManyDto, data, {
            excludeExtraneousValues: true,
            exposeDefaultValues: false,
            exposeUnsetFields: false,
        });
    }

    copy(data: PartialPropertiesOf<FindManyDto>): FindManyDto {
        return new FindManyDto({
            page: data.page ?? this.page,
            perPage: data.perPage ?? this.perPage,
        });
    }

    static from(data: PartialPropertiesOf<FindManyDto>): FindManyDto {
        return new FindManyDto(data);
    }
}

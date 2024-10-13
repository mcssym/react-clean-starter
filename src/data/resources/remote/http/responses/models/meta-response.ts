import { Expose } from 'class-transformer';
import { PaginationData } from './pagination-data';
import { PropertyNames } from '@data/resources/remote/property-names';

export class MetaPaginationResponse {
    @Expose({
        name: PropertyNames.pagination,
    })
    readonly pagination!: PaginationData;

    constructor(partial: Partial<MetaPaginationResponse>) {
        Object.assign(this, partial);
    }
}

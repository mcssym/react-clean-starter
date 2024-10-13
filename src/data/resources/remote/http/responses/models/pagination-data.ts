import { PropertyNames } from '@data/resources/remote/property-names';
import { Expose } from 'class-transformer';

export class PaginationData {

    @Expose({
        name: PropertyNames.totalCount,
    })
    readonly totalCount!: number;

    @Expose({
        name: PropertyNames.currentPage,
    })
    readonly currentPage!: number;

    @Expose({
        name: PropertyNames.nextPage,
    })
    readonly nextPage!: number;

    @Expose({
        name: PropertyNames.perPage,
    })
    readonly perPage!: number;

    constructor(partial: Partial<PaginationData>) {
        Object.assign(this, partial);
    }

    get totalPages(): number {
        return Math.ceil(this.totalCount / this.perPage);
    }

}

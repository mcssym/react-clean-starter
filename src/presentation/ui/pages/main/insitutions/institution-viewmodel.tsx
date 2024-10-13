import { FindManyDto } from '@data/resources/remote/http/dto/find-many-query.dto';
import { InstitutionsEndpoint } from '@data/resources/remote/http/endpoints/institutions.endpoint';
import { InstitutionModel } from '@data/resources/remote/http/models/institution.model';
import { PaginationData } from '@data/resources/remote/http/responses/models/pagination-data';
import { NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { ToastService, ToastType } from '@foundation/core/system/navigation/toast-service';
import { ViewModel } from '@foundation/core/system/state/view-model';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import { TranslatorService } from '@foundation/core/system/translation/translator-service';
import Logger from '@foundation/helpers/logger';
import type { PartialPropertiesOf } from '@foundation/supports/types';

const NOMINAL = Symbol('InstitutionViewState');

export class InstitutionViewState {
    [NOMINAL] = NOMINAL;
    readonly loading: boolean;
    readonly items: InstitutionModel[];
    readonly dto: FindManyDto;
    readonly pagination?: PaginationData;

    constructor(_: PartialPropertiesOf<InstitutionViewState>) {
        this.loading = _.loading ?? false;
        this.items = _.items ?? [];
        this.dto = _.dto ?? this.defaultDto();
        this.pagination = _.pagination;
    }

    get hasMore(): boolean {
        return this.page < (this.pagination?.nextPage ?? 2);
    }

    get hasPrevious(): boolean {
        return this.page > 1;
    }

    get pagesRange(): number[] {
        if (this.pagination == null) {
            return [this.page];
        }

        const start = Math.max(1, this.page - 3);
        const end = Math.min(this.pagination.totalPages, this.page + 2);

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    }

    get page(): number {
        return this.dto.page;
    }

    defaultDto(): FindManyDto {
        const location = window.location.search.split('?').map((item) => item.split('&')).flat().map((item) => item.split('='));
        const data = Object.fromEntries(location);
        return FindManyDto.parse({
            page: 1,
            per_page: 16,
            ...(data ?? {}),
        });
    }

}

export class InstitutionViewModel extends ViewModel<InstitutionViewState> {
    static readonly token = Symbol('InstitutionViewModel');

    readonly #logger = new Logger('InstitutionViewModel');

    readonly #endpoint: InstitutionsEndpoint;
    readonly #toastService: ToastService;
    readonly #translator: TranslatorService;
    readonly #navigator: NavigationService;

    constructor(data: { navigator: NavigationService, endpoint: InstitutionsEndpoint, toastService: ToastService, translator: TranslatorService }) {
        super(properties => new InstitutionViewState(properties));

        this.#endpoint = data.endpoint;
        this.#toastService = data.toastService;
        this.#translator = data.translator;
        this.#navigator = data.navigator;
    }

    override onMount(): void {
        this.#load();
    }

    async #load(): Promise<void> {
        if (this.state.loading || !this.state.hasMore) {
            return;
        }

        this.copyState({
            loading: true
        });
        const dto = this.state.dto;
        this.#navigator.updateSearchParams(new URLSearchParams(dto.toData()));

        try {
            const result = await this.#endpoint.findMany(dto);

            this.copyState({
                loading: false,
                items: result.data,
                pagination: result.meta.pagination,
            });
        } catch (error) {
            this.copyState({
                loading: false
            });
            this.#toastService.show({
                type: ToastType.error,
                message: this.#translator.singular(TranslationKeys.failedLoadingData),
            });

            this.#logger.error('Error loading institutions', error);

        }
    }

    loadAt(page: number): void {
        this.copyState({
            dto: this.state.dto.copy({
                page: page,
            }),
        });
        this.#load();
    }
}

import { PropertiesOf } from "@foundation/supports/types";
import { Type, Expose, plainToInstance, instanceToPlain } from "class-transformer";
import { InstitutionModel } from "../../models/institution.model";
import { MetaPaginationResponse } from "../models/meta-response";
import { PropertyNames } from "@data/resources/remote/property-names";

export class InstitutionsResponse {
    @Type(() => InstitutionModel)
    @Expose({ name: 'd' })
    public readonly data!: InstitutionModel[];

    @Type(() => MetaPaginationResponse)
    @Expose({
        name: PropertyNames.meta,
    })
    public readonly meta!: MetaPaginationResponse;

    constructor(data: PropertiesOf<InstitutionsResponse>) {
        Object.assign(this, data);
    }

    static fromJson(data: Record<string, unknown>): InstitutionsResponse {
        return plainToInstance(InstitutionsResponse, data);
    }

    static fromJsonArray(data: Array<Record<string, unknown>>): InstitutionsResponse[] {
        return plainToInstance(InstitutionsResponse, data) as unknown as InstitutionsResponse[];
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this);
    }
}
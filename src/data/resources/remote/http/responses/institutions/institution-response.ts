import { PropertiesOf } from "@foundation/supports/types";
import { Type, Expose, plainToInstance, instanceToPlain } from "class-transformer";
import { InstitutionModel } from "../../models/institution.model";

export class InstitutionResponse {
    @Type(() => InstitutionModel)
    @Expose({ name: 'd' })
    public readonly data!: InstitutionModel;

    constructor(data: PropertiesOf<InstitutionResponse>) {
        Object.assign(this, data);
    }

    static fromJson(data: Record<string, unknown>): InstitutionResponse {
        return plainToInstance(InstitutionResponse, data);
    }

    static fromJsonArray(data: Array<Record<string, unknown>>): InstitutionResponse[] {
        return plainToInstance(InstitutionResponse, data) as unknown as InstitutionResponse[];
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this);
    }
}
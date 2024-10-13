import { PropertiesOf } from "@foundation/supports/types";
import { Expose, instanceToPlain, plainToInstance, Transform } from "class-transformer";
import "reflect-metadata";
import { PropertyNames } from "../../property-names";
import { DateHelpers } from "@foundation/helpers/date-helpers";
import { Moment } from "moment";
import type { Phone, Coordinates, Address } from "@foundation/helpers/types";


export class InstitutionModel {
    @Expose({
        name: PropertyNames.id,
    })
    public readonly id!: string;

    @Expose({
        name: PropertyNames.uuid,
    })
    public readonly uuid!: string;

    @Expose({
        name: PropertyNames.label,
    })
    public readonly label!: string;

    @Expose({
        name: PropertyNames.description,
    })
    public readonly description?: string | null;

    @Expose({
        name: PropertyNames.email,
    })
    public readonly email?: string | null;

    @Expose({
        name: PropertyNames.address,
    })
    public readonly address?: Address | null;

    @Expose({
        name: PropertyNames.phone,
    })
    public readonly phone?: Phone | null;

    @Expose({
        name: PropertyNames.fax,
    })
    public readonly fax?: Phone | null;

    @Expose({
        name: PropertyNames.location,
    })
    public readonly location?: Coordinates | null;

    @Expose({
        name: PropertyNames.createdAt,
    })
    @Transform(({ value }) => DateHelpers.format(value as unknown as string), {
        toClassOnly: true,
    })
    public readonly createdAt!: Moment;

    @Expose({
        name: PropertyNames.updatedAt,
    })
    @Transform(({ value }) => DateHelpers.format(value as unknown as string), {
        toClassOnly: true,
    })
    public readonly updatedAt!: Moment;

    constructor(data: PropertiesOf<InstitutionModel>) {
        Object.assign(this, data);
    }

    toJson(): string {
        return JSON.stringify(instanceToPlain(this, {
            excludeExtraneousValues: false,
            exposeUnsetFields: false,
        }));
    }

    static fromJson(json: string): InstitutionModel {
        return plainToInstance(InstitutionModel, json, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}
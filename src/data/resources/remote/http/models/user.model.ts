import { PropertiesOf } from "@foundation/supports/types";
import { Expose, instanceToPlain, plainToInstance } from "class-transformer";
import "reflect-metadata";


export class UserModel {
    @Expose({ name: 'i' })
    public readonly id!: string;

    @Expose({ name: 'ui' })
    public readonly uuid!: string;

    @Expose({ name: 'name' })
    public readonly name!: string;

    constructor(data: PropertiesOf<UserModel>) {
        Object.assign(this, data);
    }

    toJson(): string {
        return JSON.stringify(instanceToPlain(this, {
            excludeExtraneousValues: false,
            exposeUnsetFields: false,
        }));
    }

    static fromJson(json: string): UserModel {
        return plainToInstance(UserModel, json, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
        });
    }
}
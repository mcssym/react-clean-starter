import { PropertiesOf } from "@foundation/supports/types";
import { Type, Expose, plainToInstance, instanceToPlain } from "class-transformer";
import { UserModel } from "../../models/user.model";

export class UsersMeResponse {
    @Type(() => UserModel)
    @Expose({ name: 'd' })
    public readonly data!: UserModel;

    constructor(data: PropertiesOf<UsersMeResponse>) {
        Object.assign(this, data);
    }

    static fromJson(data: Record<string, unknown>): UsersMeResponse {
        return plainToInstance(UsersMeResponse, data);
    }

    static fromJsonArray(data: Array<Record<string, unknown>>): UsersMeResponse[] {
        return plainToInstance(UsersMeResponse, data) as unknown as UsersMeResponse[];
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this);
    }
}
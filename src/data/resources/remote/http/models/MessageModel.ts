import { Expose, Type, deserialize, deserializeArray, instanceToPlain } from 'class-transformer';
import { type PropertiesOf } from 'foundation/supports/types';

export class MessageModel {
    @Expose({ name: 'id' })
    public readonly id!: string;

    @Expose({ name: 'user_id' })
    public readonly userId!: string;

    @Expose()
    public readonly content!: string;

    @Type(() => Date)
    @Expose({ name: 'created_at' })
    public readonly createdAt!: Date;

    constructor(data: PropertiesOf<MessageModel>) {
        Object.assign(this, data);
    }

    static fromJson(data: string): MessageModel {
        return deserialize(MessageModel, data);
    }

    static fromJsonArray(data: string): MessageModel[] {
        return deserializeArray(MessageModel, data) as unknown as MessageModel[];
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this);
    }
}

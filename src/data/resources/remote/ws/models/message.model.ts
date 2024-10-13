import { Expose } from 'class-transformer';

export class MessageModel {
    @Expose({ name: 'id' })
    public readonly id!: string;

    @Expose({ name: 'user_id' })
    public readonly userId!: string;

    @Expose()
    public readonly content!: string;

    @Expose({ name: 'created_at' })
    public readonly createdAt!: Date;
}

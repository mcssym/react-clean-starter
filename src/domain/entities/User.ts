import { deserialize, deserializeArray, instanceToPlain } from 'class-transformer';
import { type PropertiesOf } from 'foundation/supports/types';

export class User {
    id: string;
    username: string;
    name: string;

    constructor(data: PropertiesOf<User>) {
        this.id = data.id;
        this.name = data.name;
        this.username = data.username;
    }

    toJson(): string {
        return JSON.stringify(instanceToPlain(this));
    }

    toMap(): Record<string, any> {
        return instanceToPlain(this);
    }

    static fromJson(json: string): User {
        return deserialize(User, json, {
            enableImplicitConversion: true,
        });
    }

    static fromJsonArray(json: string): User[] {
        return deserializeArray(User, json);
    }
}

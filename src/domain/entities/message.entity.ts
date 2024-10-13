import type { UserModel } from "@data/resources/remote/http/models/user.model";

export class Message {
    constructor(public id: string, public content: string, public user: UserModel, public creationDate: Date) {

    }
}

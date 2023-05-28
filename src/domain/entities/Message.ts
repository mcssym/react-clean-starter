import { type User } from './User';

export class Message {
    constructor(public id: string, public content: string, public user: User, public creationDate: Date) {

    }
}

import { type User } from 'domain/entities/User';
import { type Observable } from 'rxjs';

export const MEMBER_PROVIDER_TOKEN = Symbol('MEMBER_PROVIDER_TOKEN');

export interface IMemberProvider {
    addMember: (user: User) => void;
    removeMember: (user: User) => void;
    members: () => User[];
    onNewUser: () => Observable<User>;
}

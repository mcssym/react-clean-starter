
import type { UserModel } from '@data/resources/remote/http/models/user.model';
import type { Observable } from 'rxjs';

export const MEMBER_PROVIDER_TOKEN = Symbol('MEMBER_PROVIDER_TOKEN');

export interface IMemberProvider {
    addMember: (user: UserModel) => void;
    removeMember: (user: UserModel) => void;
    members: () => UserModel[];
    onNewUser: () => Observable<UserModel>;
}

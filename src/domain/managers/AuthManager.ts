
import { User } from 'domain/entities/User';
import { type SessionStorageService } from 'domain/services/io/storage/SessionStorageService';
import { StateNotifier } from 'foundation/core/system/state/StateNotifier';
import { type Nullable } from 'foundation/supports/types';

export class AuthState {
    constructor(public user?: User) {
    }
}

const NOMINAL = Symbol('AuthManager');
export class AuthManager extends StateNotifier<AuthState> {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('AuthManager');

    #sessionStorage: SessionStorageService;

    constructor(sessionStorage: SessionStorageService) {
        super(properties => new AuthState(properties.user));
        this.#sessionStorage = sessionStorage;
    }

    get authenticated(): boolean {
        return this.state.user != null;
    }

    async initialize(): Promise<void> {
        const user = await this.#readFromSession();
        if (user != null) {
            this.copyState({
                user
            });
        }
    }

    reset(): void {
        this.copyState({
            user: undefined
        });
        this.#sessionStorage.remove('__user').catch(() => { });
    }

    authenticate(user: User): void {
        this.copyState({
            user
        });
        this.#saveInSession(user);
    }

    #saveInSession(user: User): void {
        this.#sessionStorage.set('__user', user.toJson()).catch(() => { });
    }

    async #readFromSession(): Promise<Nullable<User>> {
        const json = await this.#sessionStorage.get('__user');
        if (json != null) {
            return new User(JSON.parse(json));
        }

        return null;
    }
}

import type { IAxiosInstanceProvider } from '@application/services/io/http/axios-http-client';
import type { AppStoragesService } from '@application/services/io/storage/app-storages.services';
import { UserModel } from '@data/resources/remote/http/models/user.model';
import { StateNotifier } from '@foundation/core/system/state/state-notifier';
import type { Nullable } from '@foundation/supports/types';

export interface AuthSession {
    token: string;
}

export class AuthState {
    constructor(public readonly session?: AuthSession, public user?: UserModel) {
    }
}

const userKey = '__u';
const sessionKey = '__s';

const NOMINAL = Symbol('AuthManager');
export class AuthManager extends StateNotifier<AuthState> {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('AuthManager');

    readonly #storage: AppStoragesService;
    readonly #axiosInstanceProvider: IAxiosInstanceProvider;

    constructor(params: { storage: AppStoragesService, axiosInstanceProvider: IAxiosInstanceProvider }) {
        super(properties => new AuthState(properties.session, properties.user));
        this.#storage = params.storage;
        this.#axiosInstanceProvider = params.axiosInstanceProvider;
    }

    get authenticated(): boolean {
        return this.state.session != null;
    }

    async initialize(): Promise<void> {
        this.#setAxiosInterceptor();
        const token = await this.#storage.get(sessionKey);
        if (token != null) {
            this.copyState({
                session: {
                    token
                }
            });
        }
        const user = await this.#readUserFromSession();
        if (user instanceof UserModel) {
            this.copyState({
                user,
            });
        }
    }

    reset(): void {
        this.copyState({
            user: undefined,
            session: undefined,
        });
        this.#storage.remove(userKey).catch(() => { });
        this.#storage.remove(sessionKey).catch(() => { });
    }

    setUser(user: UserModel): void {
        this.copyState({
            user
        });
        this.#saveInSession();
    }

    setSession(session: AuthSession): void {
        this.copyState({
            session
        });
        this.#saveInSession();
    }

    #setAxiosInterceptor(): void {
        this.#axiosInstanceProvider.axios.interceptors.request.use(config => {
            const token = this.state.session?.token;
            if (token != null) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }


    #saveInSession(): void {
        const user = this.state.user;
        const session = this.state.session;

        if (session != null) {
            this.#storage.set(sessionKey, session.token).catch(() => { });
            this.#storage.set('Authorization', `Bearer ${session.token}`).catch(() => { });
        }

        if (user != null) {
            this.#storage.set(userKey, user.toJson()).catch(() => { });
        }
    }

    async #readUserFromSession(): Promise<Nullable<UserModel>> {
        const json = await this.#storage.get(userKey);
        if (json != null) {
            const user = UserModel.fromJson(json);
            if (user instanceof UserModel) {
                return user;
            }
        }

        return null;
    }
}

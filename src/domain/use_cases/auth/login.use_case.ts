import { Routes } from '@application/controllers/navigation/routes-provider';
import type { AuthManager } from '@application/managers/auth.manager';
import { LoginDto } from '@data/resources/remote/http/dto/auth/login.dto';
import type { IAuthEndpoint } from '@data/resources/remote/http/endpoints/auth.endpoint';
import type { IUsersEndpoint } from '@data/resources/remote/http/endpoints/users.endpoint';
import type { NavigationService } from '@foundation/core/system/navigation/navigation-service';

export interface LoginData {
    login: string;
    password: string;
}

const NOMINAL = Symbol('NOMINAL(LoginUseCase)');
export class LoginUseCase {
    static readonly token: symbol = Symbol('LoginUseCase');

    [NOMINAL]: symbol = NOMINAL;

    readonly #authManager: AuthManager;
    readonly #navigation: NavigationService;
    readonly #authEndpoint: IAuthEndpoint;
    readonly #usersEndpoint: IUsersEndpoint;

    constructor(params: { authManager: AuthManager, navigation: NavigationService, authEndpoint: IAuthEndpoint, usersEndpoint: IUsersEndpoint, }) {
        this.#authManager = params.authManager;
        this.#authEndpoint = params.authEndpoint;
        this.#navigation = params.navigation;
        this.#usersEndpoint = params.usersEndpoint;
    }

    async login(data: LoginData): Promise<void> {
        const loginResponse = await this.#authEndpoint.login(new LoginDto({
            login: data.login,
            password: data.password,
        }))
        this.#authManager.setSession({
            token: loginResponse.data.token
        });

        const usersMeResponse = await this.#usersEndpoint.me();
        const user = usersMeResponse.data;
        this.#authManager.setUser(user);

        this.#navigation.goTo(Routes.main.home.resolve(), true);
    }
}

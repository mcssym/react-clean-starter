import { DialogController } from '@application/controllers/dialog/dialog.controller';
import { NavigationController } from '@application/controllers/navigation/navigation.controller';
import { AuthManager } from '@application/managers/auth.manager';
import { DeviceInfoService } from '@application/services/installation/device-info.service';
import { InstallationService } from '@application/services/installation/installation.service';
import { AXIOS_INSTANCE_PROVIDER_TOKEN, AxiosHttpClient, type IAxiosInstanceProvider } from '@application/services/io/http/axios-http-client';
import AxiosHttpErrorHandler, { AXIOS_HTTP_ERROR_HANDLER_TOKEN, type IAxiosHttpErrorHandler } from '@application/services/io/http/axios-http-error-handler';
import { AppStoragesService } from '@application/services/io/storage/app-storages.services';
import { CookieStorageService } from '@application/services/io/storage/cookie-storage.service';
import { LocalStorageService } from '@application/services/io/storage/local-storage.service';
import { WebSocketClientService } from '@application/services/io/ws/web-socket-client.service';
import { I18NextTranslatorService } from '@application/services/translation/i18-next-translator.service';
import { AUTH_ENDPOINT_TOKEN, AuthEndpoint, type IAuthEndpoint } from '@data/resources/remote/http/endpoints/auth.endpoint';
import { type IInstallationEndpoint, INSTALLATION_ENDPOINT_TOKEN, InstallationEndpoint } from '@data/resources/remote/http/endpoints/installations.endpoint';
import { UsersEndpoint } from '@data/resources/remote/http/endpoints/users.endpoint';
import { ChatGateway } from '@data/resources/remote/ws/gateways/chat.gateway';
import { LoginUseCase } from '@domain/use_cases/auth/login.use_case';
import { LogoutUseCase } from '@domain/use_cases/auth/logout.use_case';
import { AC_API_BASE_URL, Config } from '@foundation/core/config';
import { InjectionType, LoadableInjection, type LoadableInjections } from '@foundation/core/di/injections';
import { HTTP_CLIENT_TOKEN, type IHttpClient } from '@foundation/core/system/io/http/i-http-client';
import { COOKIE_STORAGE_TOKEN, type ICookieStorage } from '@foundation/core/system/io/storage/i-cookie-storage';
import { type ILocalStorage, LOCAL_STORAGE_TOKEN } from '@foundation/core/system/io/storage/i-local-storage';
import { type IWebSocketClient, WEB_SOCKET_CLIENT_TOKEN } from '@foundation/core/system/io/ws/i-web-socket-client';
import { DIALOG_SERVICE_TOKEN, type DialogService } from '@foundation/core/system/navigation/dialog-service';
import { NAVIGATION_SERVICE_TOKEN, type NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { TRANSLATOR_SERVICE_TOKEN, type TranslatorService } from '@foundation/core/system/translation/translator-service';
import { type IReactRouterProvider, REACT_ROUTER_PROVIDER_TOKEN, createRouter } from '@presentation/providers/router.provider';
import { SessionStorageService } from '../services/io/storage/session-storage.service';
import { RecoverUseCase } from '@domain/use_cases/auth/recover.use_case';
import { ToastController } from '@application/controllers/toast/toast.controller';
import { TOAST_SERVICE_TOKEN, type ToastService } from '@foundation/core/system/navigation/toast-service';
import { InstitutionsEndpoint } from '@data/resources/remote/http/endpoints/institutions.endpoint';


export function loadInjections(): LoadableInjections {
    return [
        new LoadableInjection<Config>(Config.token, {
            type: InjectionType.singleton,
            getter: () => new Config(),
        }),
        new LoadableInjection<SessionStorageService>(SessionStorageService.token, {
            type: InjectionType.singleton,
            getter: () => new SessionStorageService(),
        }),
        new LoadableInjection<CookieStorageService>(CookieStorageService.token, {
            type: InjectionType.singleton,
            getter: () => new CookieStorageService(),
        }),
        new LoadableInjection<LocalStorageService>(LocalStorageService.token, {
            type: InjectionType.singleton,
            getter: () => new LocalStorageService(),
        }),
        new LoadableInjection<ICookieStorage>(COOKIE_STORAGE_TOKEN, {
            type: InjectionType.reference,
            value: CookieStorageService.token
        }),
        new LoadableInjection<ILocalStorage>(LOCAL_STORAGE_TOKEN, {
            type: InjectionType.reference,
            value: LocalStorageService.token
        }),
        new LoadableInjection<I18NextTranslatorService>(I18NextTranslatorService.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new I18NextTranslatorService(resolver.resolve(COOKIE_STORAGE_TOKEN)),
        }),
        new LoadableInjection<TranslatorService>(TRANSLATOR_SERVICE_TOKEN, {
            type: InjectionType.reference,
            value: I18NextTranslatorService.token
        }),
        new LoadableInjection<IAxiosHttpErrorHandler>(AXIOS_HTTP_ERROR_HANDLER_TOKEN, {
            type: InjectionType.factory,
            getter: (resolver) => new AxiosHttpErrorHandler(resolver.resolve<TranslatorService>(TRANSLATOR_SERVICE_TOKEN)),
        }),
        new LoadableInjection<AxiosHttpClient>(AxiosHttpClient.token, {
            type: InjectionType.singleton,
            getter: (resolver) => {
                const apiBaseUrl = resolver.resolve<Config>(Config.token).get(AC_API_BASE_URL);
                const errorHandler = resolver.resolve<IAxiosHttpErrorHandler>(AXIOS_HTTP_ERROR_HANDLER_TOKEN);
                return new AxiosHttpClient(errorHandler, {
                    baseURL: apiBaseUrl,
                });
            },
        }),
        new LoadableInjection<IAxiosInstanceProvider>(AXIOS_INSTANCE_PROVIDER_TOKEN, {
            type: InjectionType.reference,
            value: AxiosHttpClient.token
        }),
        new LoadableInjection<IHttpClient>(HTTP_CLIENT_TOKEN, {
            type: InjectionType.reference,
            value: AxiosHttpClient.token
        }),
        new LoadableInjection<WebSocketClientService>(WebSocketClientService.token, {
            type: InjectionType.singleton,
            getter: () => new WebSocketClientService({
                url: ''
            }),
        }),
        new LoadableInjection<IWebSocketClient>(WEB_SOCKET_CLIENT_TOKEN, {
            type: InjectionType.reference,
            value: WebSocketClientService.token
        }),
        new LoadableInjection<IReactRouterProvider>(REACT_ROUTER_PROVIDER_TOKEN, {
            type: InjectionType.singleton,
            getter: (resolver) => ({
                router: createRouter(resolver)
            }),
        }),
        new LoadableInjection<NavigationController>(NavigationController.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new NavigationController(resolver.resolve<IReactRouterProvider>(REACT_ROUTER_PROVIDER_TOKEN).router),
        }),
        new LoadableInjection<NavigationService>(NAVIGATION_SERVICE_TOKEN, {
            type: InjectionType.reference,
            value: NavigationController.token
        }),
        new LoadableInjection<DialogController>(DialogController.token, {
            type: InjectionType.singleton,
            getter: (_) => new DialogController(),
        }),
        new LoadableInjection<DialogService>(DIALOG_SERVICE_TOKEN, {
            type: InjectionType.reference,
            value: DialogController.token
        }),
        new LoadableInjection<ToastController>(ToastController.token, {
            type: InjectionType.singleton,
            getter: (_) => new ToastController(),
        }),
        new LoadableInjection<ToastService>(TOAST_SERVICE_TOKEN, {
            type: InjectionType.reference,
            value: ToastController.token
        }),
        new LoadableInjection<AuthManager>(AuthManager.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new AuthManager({
                storage: resolver.resolve<AppStoragesService>(AppStoragesService.token),
                axiosInstanceProvider: resolver.resolve<IAxiosInstanceProvider>(AXIOS_INSTANCE_PROVIDER_TOKEN)
            })
        }),
        new LoadableInjection<ChatGateway>(ChatGateway.token, {
            type: InjectionType.factory,
            getter: (resolver) => new ChatGateway(resolver.resolve<IWebSocketClient>(WEB_SOCKET_CLIENT_TOKEN))
        }),
        new LoadableInjection<UsersEndpoint>(UsersEndpoint.token, {
            type: InjectionType.factory,
            getter: (resolver) => new UsersEndpoint(resolver.resolve<IHttpClient>(HTTP_CLIENT_TOKEN))
        }),
        new LoadableInjection<InstitutionsEndpoint>(InstitutionsEndpoint.token, {
            type: InjectionType.factory,
            getter: (resolver) => new InstitutionsEndpoint(resolver.resolve<IHttpClient>(HTTP_CLIENT_TOKEN))
        }),
        new LoadableInjection<IAuthEndpoint>(AUTH_ENDPOINT_TOKEN, {
            type: InjectionType.factory,
            getter: (resolver) => new AuthEndpoint(resolver.resolve<IHttpClient>(HTTP_CLIENT_TOKEN))
        }),
        new LoadableInjection<AuthEndpoint>(AuthEndpoint.token, {
            type: InjectionType.reference,
            value: AUTH_ENDPOINT_TOKEN
        }),
        new LoadableInjection<RecoverUseCase>(RecoverUseCase.token, {
            type: InjectionType.factory,
            getter: (resolver) => new RecoverUseCase(
                {
                    authEndpoint: resolver.resolve<AuthEndpoint>(AuthEndpoint.token),
                    navigation: resolver.resolve<NavigationService>(NAVIGATION_SERVICE_TOKEN),
                    dialogService: resolver.resolve<DialogService>(DIALOG_SERVICE_TOKEN),
                    translatorService: resolver.resolve<TranslatorService>(TRANSLATOR_SERVICE_TOKEN),
                }
            )
        }),
        new LoadableInjection<LoginUseCase>(LoginUseCase.token, {
            type: InjectionType.factory,
            getter: (resolver) => new LoginUseCase(
                {
                    authEndpoint: resolver.resolve<AuthEndpoint>(AuthEndpoint.token),
                    authManager: resolver.resolve<AuthManager>(AuthManager.token),
                    navigation: resolver.resolve<NavigationService>(NAVIGATION_SERVICE_TOKEN),
                    usersEndpoint: resolver.resolve<UsersEndpoint>(UsersEndpoint.token),
                }
            )
        }),
        new LoadableInjection<LogoutUseCase>(LogoutUseCase.token, {
            type: InjectionType.factory,
            getter: (resolver) => new LogoutUseCase(
                {
                    authEndpoint: resolver.resolve<AuthEndpoint>(AuthEndpoint.token),
                    authManager: resolver.resolve<AuthManager>(AuthManager.token),
                    navigation: resolver.resolve<NavigationService>(NAVIGATION_SERVICE_TOKEN),
                    dialog: resolver.resolve<DialogService>(DIALOG_SERVICE_TOKEN),
                    translator: resolver.resolve<TranslatorService>(TRANSLATOR_SERVICE_TOKEN),
                }
            )
        }),
        new LoadableInjection<AppStoragesService>(AppStoragesService.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new AppStoragesService(
                resolver.resolve<ICookieStorage>(CookieStorageService.token),
                resolver.resolve<ILocalStorage>(LocalStorageService.token),
                resolver.resolve<ILocalStorage>(SessionStorageService.token),
            )
        }),
        new LoadableInjection<IInstallationEndpoint>(INSTALLATION_ENDPOINT_TOKEN, {
            type: InjectionType.factory,
            getter: (resolver) => new InstallationEndpoint(resolver.resolve<IHttpClient>(HTTP_CLIENT_TOKEN))
        }),
        new LoadableInjection<DeviceInfoService>(DeviceInfoService.token, {
            type: InjectionType.singleton,
            getter: (_) => new DeviceInfoService()
        }),
        new LoadableInjection<InstallationService>(InstallationService.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new InstallationService(
                {
                    axiosInstanceProvider: resolver.resolve<IAxiosInstanceProvider>(AXIOS_INSTANCE_PROVIDER_TOKEN),
                    installationEndpoint: resolver.resolve<IInstallationEndpoint>(INSTALLATION_ENDPOINT_TOKEN),
                    storages: resolver.resolve<AppStoragesService>(AppStoragesService.token),
                    config: resolver.resolve<Config>(Config.token),
                    deviceInfo: resolver.resolve<DeviceInfoService>(DeviceInfoService.token)
                }
            )
        }),
    ];
}

import { SessionStorageService } from './../../domain/services/io/storage/SessionStorageService';
import { Config } from 'application/Config';
import { I18NextTranslatorService } from 'domain/services/translation/I18NextTranslatorService';
import { NavigationController } from 'domain/controllers/navigation/NavigationController';
import { AXIOS_INSTANCE_PROVIDER_TOKEN, AxiosHttpClient, type IAxiosInstanceProvider } from 'domain/services/io/http/AxiosHttpClient';
import AxiosHttpErrorHandler, { AXIOS_HTTP_ERROR_HANDLER_TOKEN, type IAxiosHttpErrorHandler } from 'domain/services/io/http/AxiosHttpErrorHandler';
import { CookieStorageService } from 'domain/services/io/storage/CookieStorageService';
import { LocalStorageService } from 'domain/services/io/storage/LocalStorageService';
import { WebSocketClientService } from 'domain/services/io/ws/WebSocketClientService';
import { InjectionType, LoadableInjection, type LoadableInjections } from 'foundation/core/di/injections';
import { type IHttpClient, HTTP_CLIENT_TOKEN } from 'foundation/core/system/io/http/IHttpClient';
import { COOKIE_STORAGE_TOKEN, type ICookieStorage } from 'foundation/core/system/io/storage/ICookieStorage';
import { LOCAL_STORAGE_TOKEN, type ILocalStorage } from 'foundation/core/system/io/storage/ILocalStorage';
import { WEB_SOCKET_CLIENT_TOKEN, type IWebSocketClient } from 'foundation/core/system/io/ws/IWebSocketClient';
import { type NavigationService, NAVIGATION_SERVICE_TOKEN } from 'foundation/core/system/navigation/NavigationService';
import { TRANSLATOR_SERVICE_TOKEN, type TranslatorService } from 'foundation/core/system/translation/TranslatorService';
import { type IReactRouterProvider, REACT_ROUTER_PROVIDER_TOKEN, createRouter } from 'presentation/providers/RouterProvider';
import { DialogController } from 'domain/controllers/dialog/DialogController';
import { DIALOG_SERVICE_TOKEN, type DialogService } from 'foundation/core/system/navigation/DialogService';
import { AuthManager } from 'domain/managers/AuthManager';
import { type IMessageEndpoint, MESSAGE_ENDPOINT_TOKEN, MessageEndpoint } from 'data/resources/remote/http/endpoints/MessageEndpoint';
import { CHAT_GATEWAY_TOKEN, ChatGateway, type IChatGateway } from 'data/resources/remote/ws/gateways/ChatGateway';
import { AUTH_USE_CASES_TOKEN, AuthUseCases, type IAuthUseCases } from 'domain/use_cases/AuthUseCases';
import { type IMemberProvider, MEMBER_PROVIDER_TOKEN } from 'domain/use_cases/contracts/MemberProvider';
import { CHAT_MEMBERS_USE_CASES_TOKEN, CHAT_USE_CASES_TOKEN, ChatUseCases, type IChatMemberUseCases, type IChatUseCases } from 'domain/use_cases/ChatUseCases';
import { LocalChat, LocalMemberProvider } from './impl/locals';

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
            getter: (resolver) => new AxiosHttpClient(resolver.resolve<IAxiosHttpErrorHandler>(AXIOS_HTTP_ERROR_HANDLER_TOKEN)),
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
        new LoadableInjection<AuthManager>(AuthManager.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new AuthManager(resolver.resolve<SessionStorageService>(SessionStorageService.token))
        }),
        new LoadableInjection<MessageEndpoint>(MessageEndpoint.token, {
            type: InjectionType.factory,
            getter: (resolver) => new MessageEndpoint(resolver.resolve<IHttpClient>(HTTP_CLIENT_TOKEN))
        }),
        // new LoadableInjection<IMessageEndpoint>(MESSAGE_ENDPOINT_TOKEN, {
        //     type: InjectionType.reference,
        //     value: MessageEndpoint.token
        // }),
        new LoadableInjection<ChatGateway>(ChatGateway.token, {
            type: InjectionType.factory,
            getter: (resolver) => new ChatGateway(resolver.resolve<IWebSocketClient>(WEB_SOCKET_CLIENT_TOKEN))
        }),
        // new LoadableInjection<IChatGateway>(CHAT_GATEWAY_TOKEN, {
        //     type: InjectionType.reference,
        //     value: ChatGateway.token
        // }),
        new LoadableInjection<AuthUseCases>(AuthUseCases.token, {
            type: InjectionType.factory,
            getter: (resolver) => new AuthUseCases(
                resolver.resolve<IMemberProvider>(MEMBER_PROVIDER_TOKEN),
                resolver.resolve<AuthManager>(AuthManager.token),
                resolver.resolve<NavigationService>(NAVIGATION_SERVICE_TOKEN),
                resolver.resolve<DialogService>(DIALOG_SERVICE_TOKEN),
                resolver.resolve<TranslatorService>(TRANSLATOR_SERVICE_TOKEN),
            )
        }),
        new LoadableInjection<IAuthUseCases>(AUTH_USE_CASES_TOKEN, {
            type: InjectionType.reference,
            value: AuthUseCases.token
        }),
        new LoadableInjection<ChatUseCases>(ChatUseCases.token, {
            type: InjectionType.factory,
            getter: (resolver) => new ChatUseCases(
                resolver.resolve<IChatGateway>(CHAT_GATEWAY_TOKEN),
                resolver.resolve<IMemberProvider>(MEMBER_PROVIDER_TOKEN),
                resolver.resolve<IMessageEndpoint>(MESSAGE_ENDPOINT_TOKEN),
            )
        }),
        new LoadableInjection<IChatUseCases>(CHAT_USE_CASES_TOKEN, {
            type: InjectionType.reference,
            value: ChatUseCases.token
        }),
        new LoadableInjection<IChatMemberUseCases>(CHAT_MEMBERS_USE_CASES_TOKEN, {
            type: InjectionType.reference,
            value: ChatUseCases.token
        }),
        new LoadableInjection<LocalMemberProvider>(LocalMemberProvider.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new LocalMemberProvider()
        }),
        new LoadableInjection<IMemberProvider>(MEMBER_PROVIDER_TOKEN, {
            type: InjectionType.reference,
            value: LocalMemberProvider.token
        }),
        new LoadableInjection<LocalChat>(LocalChat.token, {
            type: InjectionType.singleton,
            getter: (resolver) => new LocalChat(
                resolver.resolve<AuthManager>(AuthManager.token),
            )
        }, [AuthManager.token]),
        new LoadableInjection<IChatGateway>(CHAT_GATEWAY_TOKEN, {
            type: InjectionType.reference,
            value: LocalChat.token
        }),
        new LoadableInjection<IMessageEndpoint>(MESSAGE_ENDPOINT_TOKEN, {
            type: InjectionType.reference,
            value: LocalChat.token
        }),
    ];
}

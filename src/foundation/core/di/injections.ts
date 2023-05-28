export enum InjectionType {
    singleton,
    factory,
    reference,
}

export type TokenType = symbol;

export interface IInjectionResolver {
    resolve: <T = unknown>(token: TokenType) => T;
}

export type Injector<T> = (resolver: IInjectionResolver) => T;

interface BaseInjection {
    type: InjectionType;
}

export interface ValueInjection<T> extends BaseInjection {
    type: InjectionType.singleton
    getter: Injector<T>
}

export interface ReferenceInjection extends BaseInjection {
    type: InjectionType.reference;
    value: TokenType;
}

export interface FactoryInjection<T> extends BaseInjection {
    type: InjectionType.factory;
    getter: Injector<T>;
}

export type Injection<T> = ValueInjection<T> | ReferenceInjection | FactoryInjection<T>;

export class InjectionResolveError extends Error { }

export class LoadableInjection<T> {
    constructor(public readonly token: TokenType, public readonly injection: Injection<T>, public readonly dependencies?: TokenType[]) { }
}
export type LoadableInjections = Array<LoadableInjection<any>>;

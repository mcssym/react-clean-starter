/**
 * Enum representing the types of injections.
 */
export enum InjectionType {
    singleton,
    factory,
    reference,
}

/**
 * Type representing a token used for dependency injection.
 */
export type TokenType = symbol;

/**
 * Interface representing a resolver for dependency injections.
 */
export interface IInjectionResolver {
    /**
     * Resolves a dependency by its token.
     * @param {TokenType} token - The token of the dependency to resolve.
     * @returns {T} The resolved dependency.
     */
    resolve: <T = unknown>(token: TokenType) => T;
}

/**
 * Type representing an injector function.
 * @template T - The type of the dependency.
 * @param {IInjectionResolver} resolver - The resolver to use for resolving dependencies.
 * @returns {T} The resolved dependency.
 */
export type Injector<T> = (resolver: IInjectionResolver) => T;

/**
 * Base interface for all injection types.
 */
interface BaseInjection {
    /**
     * The type of the injection.
     */
    type: InjectionType;
}

/**
 * Interface representing a singleton value injection.
 * @template T - The type of the dependency.
 */
export interface ValueInjection<T> extends BaseInjection {
    /**
     * The type of the injection, which is always singleton.
     */
    type: InjectionType.singleton;

    /**
     * The injector function to get the singleton value.
     */
    getter: Injector<T>;
}

/**
     * Interface representing a reference injection.
     */
export interface ReferenceInjection extends BaseInjection {
    /**
     * The type of the injection, which is always reference.
     */
    type: InjectionType.reference;

    /**
     * The token of the referenced dependency.
     */
    value: TokenType;
}

/**
 * Interface representing a factory injection.
 * @template T - The type of the dependency.
 */
export interface FactoryInjection<T> extends BaseInjection {
    /**
     * The type of the injection, which is always factory.
     */
    type: InjectionType.factory;

    /**
     * The injector function to create the dependency.
     */
    getter: Injector<T>;
}

/**
 * Type representing any kind of injection.
 * @template T - The type of the dependency.
 */
export type Injection<T> = ValueInjection<T> | ReferenceInjection | FactoryInjection<T>;

/**
 * Error thrown when an injection cannot be resolved.
 */
export class InjectionResolveError extends Error { }

/**
 * Class representing a loadable injection with its dependencies.
 * @template T - The type of the dependency.
 */
export class LoadableInjection<T> {
    /**
     * Constructor for LoadableInjection.
     * @param {TokenType} token - The token of the dependency.
     * @param {Injection<T>} injection - The injection definition.
     * @param {TokenType[]} [dependencies] - Optional array of dependency tokens.
     */
    constructor(
        public readonly token: TokenType,
        public readonly injection: Injection<T>,
        public readonly dependencies?: TokenType[]
    ) { }
}

/**
 * Type representing an array of loadable injections.
 */
export type LoadableInjections = Array<LoadableInjection<any>>;
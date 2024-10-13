import { type IInjectionResolver, type TokenType, type Injection, InjectionResolveError, InjectionType, type LoadableInjections, type ValueInjection, type LoadableInjection } from './injections';

/**
 * Exception thrown when a dependency for an injection is missing.
 */
export class InjectionDependencyMissingException extends Error {
    /**
     * Constructor for InjectionDependencyMissingException.
     * @param {LoadableInjection<any>} injection - The injection with missing dependencies.
     */
    constructor(public readonly injection: LoadableInjection<any>) {
        super(`The dependencies [${injection?.dependencies?.map(d => d.description ?? d.toString()).join(', ') ?? ''}] of ${injection.token.description ?? injection.token.toString()} are not all registered yet. You should make sure to register them first.`);
    }
}

const NOMINAL = Symbol('NOMINAL');

/**
 * Service container for managing dependency injections.
 */
export class ServiceContainer implements IInjectionResolver {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Map of registered injections.
     */
    readonly #injections: Map<TokenType, Injection<any>>;

    /**
     * Map of singleton instances.
     */
    readonly #singletons: Map<TokenType, unknown>;

    /**
     * Constructor for ServiceContainer.
     */
    constructor() {
        this.#injections = new Map();
        this.#singletons = new Map();
    }

    /**
     * Resolves a dependency by its token.
     * @param {symbol} token - The token of the dependency to resolve.
     * @returns {T} The resolved dependency.
     * @throws {InjectionResolveError} If the injection cannot be resolved.
     */
    resolve<T>(token: symbol): T {
        const injection = this.#injections.get(token);
        if (injection === undefined) {
            throw new InjectionResolveError(`There is no Injection value with the token ${token.toString()}`);
        }
        switch (injection.type) {
            case InjectionType.reference:
                return this.resolve(injection.value);

            case InjectionType.factory:
                return injection.getter(this);

            default:
                return this.#resolveValue(token, injection);
        }
    }

    /**
     * Injects a dependency into the container.
     * @param {TokenType} token - The token of the dependency.
     * @param {Injection<T>} injection - The injection definition.
     */
    inject<T>(token: TokenType, injection: Injection<T>): void {
        this.#inject(token, injection);
    }

    /**
     * Ejects a dependency from the container.
     * @param {TokenType} token - The token of the dependency to eject.
     */
    eject(token: TokenType): void {
        this.#injections.delete(token);
        this.#singletons.delete(token);
    }

    /**
     * Re-injects a dependency into the container, replacing any existing injection.
     * @param {TokenType} token - The token of the dependency.
     * @param {Injection<T>} injection - The injection definition.
     */
    reInject<T>(token: TokenType, injection: Injection<T>): void {
        this.#inject(token, injection, true);
    }

    /**
     * Loads multiple injections into the container.
     * @param {LoadableInjections} injections - The injections to load.
     */
    load(injections: LoadableInjections): void {
        injections.forEach((injection) => {
            this.#checkRegisterDependencies(injection);
            this.inject(injection.token, injection.injection);
        });
    }

    /**
     * Resolves a singleton value.
     * @param {TokenType} token - The token of the dependency.
     * @param {ValueInjection<T>} value - The value injection definition.
     * @returns {T} The resolved singleton value.
     * @private
     */
    #resolveValue<T>(token: TokenType, value: ValueInjection<T>): T {
        if (!this.#singletons.has(token)) {
            const instance = value.getter(this);
            this.#singletons.set(token, instance);
        }
        return this.#singletons.get(token) as T;
    }

    /**
     * Injects a dependency into the container.
     * @param {TokenType} token - The token of the dependency.
     * @param {Injection<T>} injection - The injection definition.
     * @param {boolean} [force=false] - Whether to force the injection, replacing any existing injection.
     * @private
     */
    #inject<T>(token: TokenType, injection: Injection<T>, force = false): void {
        if (this.#injections.has(token) && !force) return;

        this.#injections.set(token, injection);
    }

    /**
     * Checks if all dependencies of an injection are registered.
     * @param {LoadableInjection<any>} injection - The injection to check.
     * @throws {InjectionDependencyMissingException} If any dependency is missing.
     * @private
     */
    #checkRegisterDependencies(injection: LoadableInjection<any>): void {
        const tokens = injection.dependencies ?? [];
        for (const token of tokens) {
            if (!this.#injections.has(token)) {
                throw new InjectionDependencyMissingException(injection);
            }
        }
    }
}
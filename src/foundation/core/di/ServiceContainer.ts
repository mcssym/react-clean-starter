import { type IInjectionResolver, type TokenType, type Injection, InjectionResolveError, InjectionType, type LoadableInjections, type ValueInjection, type LoadableInjection } from './injections';

export class InjectionDependencyMissingException extends Error {
    constructor(public readonly injection: LoadableInjection<any>) {
        super(`The dependencies [${injection?.dependencies?.map(d => d.description ?? d.toString()).join(', ') ?? ''}] of ${injection.token.description ?? injection.token.toString()} are not all registered yet. You should make sure to register them first.`)
    }
}

const NOMINAL = Symbol('NOMINAL');
export class ServiceContainer implements IInjectionResolver {
    [NOMINAL]: symbol = NOMINAL;

    #injections: Map<TokenType, Injection<any>>;
    #singletons: Map<TokenType, unknown>;

    constructor() {
        this.#injections = new Map();
        this.#singletons = new Map();
    }

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

    #resolveValue<T>(token: TokenType, value: ValueInjection<T>): T {
        if (!this.#singletons.has(token)) {
            const instance = value.getter(this);
            this.#singletons.set(token, instance);
        }
        return this.#singletons.get(token) as T;
    }

    inject<T>(token: TokenType, injection: Injection<T>): void {
        this.#inject(token, injection);
    }

    eject(token: TokenType): void {
        this.#injections.delete(token);
        this.#singletons.delete(token);
    }

    reInject<T>(token: TokenType, injection: Injection<T>): void {
        this.#inject(token, injection, true);
    }

    #inject<T>(token: TokenType, injection: Injection<T>, force = false): void {
        if (this.#injections.has(token) && !force) return;

        this.#injections.set(token, injection);
    }

    load(injections: LoadableInjections): void {
        injections.forEach((injection) => {
            this.#checkRegisterDependencies(injection);
            this.inject(injection.token, injection.injection);
        });
    }

    #checkRegisterDependencies(injection: LoadableInjection<any>): void {
        const tokens = injection.dependencies ?? [];
        for (const token of tokens) {
            if (!this.#injections.has(token)) {
                throw new InjectionDependencyMissingException(injection);
            }
        }
    }
}

import type { TokenType } from '@foundation/core/di/injections';
import { type ServiceContainer } from '@foundation/core/di/service-container';
import React, { useContext } from 'react';

/**
 * Context for the ServiceContainer.
 */
const ServiceContainerContext = React.createContext<ServiceContainer | null>(null);

/**
 * Props for the ServiceContainerProvider component.
 */
type ServiceContainerProviderProps = React.PropsWithChildren<{
    /**
     * The ServiceContainer instance.
     */
    container: ServiceContainer;
}>;

/**
 * Provider component for the ServiceContainer context.
 * @param {ServiceContainerProviderProps} props - The props for the component.
 * @returns {JSX.Element} The provider component.
 */
export const ServiceContainerProvider: React.FC<ServiceContainerProviderProps> = ({ container, children }) => {
    return <ServiceContainerContext.Provider value={container}>{children}</ServiceContainerContext.Provider>;
};

/**
 * Consumer component for the ServiceContainer context.
 */
export const ServiceContainerConsumer = ServiceContainerContext.Consumer;

/**
 * Hook to access the ServiceContainer from the context.
 * @returns {ServiceContainer} The ServiceContainer instance.
 * @throws {Error} If the ServiceContainer is not accessible through the Context API.
 */
export function useContainer(): ServiceContainer {
    const container = useContext(ServiceContainerContext);
    if (container === null) {
        throw new Error('The ServiceContainer is not accessible through the Context API.');
    }
    return container;
}

/**
 * Hook to resolve a dependency in a component.
 * @template T - The type of the dependency.
 * @param {TokenType} token - The token of the dependency to resolve.
 * @returns {T} The resolved dependency.
 */
export function useInjection<T>(token: TokenType): T {
    const container = useContainer();
    return container.resolve<T>(token);
}

/**
 * Interface representing injected props.
 */
interface InjectedProps {
    /**
     * The ServiceContainer instance.
     */
    container: ServiceContainer;
}

/**
 * Higher-order component to inject the ServiceContainer into a component.
 * @template P - The props of the component.
 * @param {React.ComponentType<P>} Component - The component to inject the ServiceContainer into.
 * @returns {React.FC<Exclude<P, keyof InjectedProps>>} The higher-order component.
 */
export function withServiceContainer<P extends InjectedProps>(
    Component: React.ComponentType<P>
): React.FC<Exclude<P, keyof InjectedProps>> {
    const ComponentWithServiceContainer = (props: Exclude<P, keyof InjectedProps>): JSX.Element => (
        <ServiceContainerConsumer>
            {(container) => {
                if (container === null) {
                    return <div>Loading...</div>;
                }
                return (
                    <Component
                        {...props}
                        container={container}
                    />
                );
            }}
        </ServiceContainerConsumer>
    );

    return ComponentWithServiceContainer;
}
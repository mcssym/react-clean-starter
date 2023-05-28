
import { type ServiceContainer } from 'foundation/core/di/ServiceContainer';
import type { TokenType } from 'foundation/core/di/injections';
import React, { useContext } from 'react'

const ServiceContainerContext = React.createContext<ServiceContainer | null>(null);

type ServiceContainerProviderProps = React.PropsWithChildren<{
    container: ServiceContainer;
}>;

export const ServiceContainerProvider: React.FC<ServiceContainerProviderProps> = ({ container, children }) => {
    return <ServiceContainerContext.Provider value={container}>{children}</ServiceContainerContext.Provider>;
};

export const ServiceContainerConsumer = ServiceContainerContext.Consumer;

/**
 * Defines the hook to access to the container
 */
export function useContainer(): ServiceContainer {
    const container = useContext(ServiceContainerContext);
    if (container === null) {
        throw new Error('The ServiceContainer is not accessible through the Context API.');
    }
    return container;
}

/**
 * Defines the hook used to resolve a dependency in a component.
 */
export function useInjection<T>(token: TokenType): T {
    const container = useContainer();
    return container.resolve<T>(token);
}

interface InjectedProps {
    container: ServiceContainer;
}

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
                )
            }}
        </ServiceContainerConsumer>
    );

    return ComponentWithServiceContainer;
}

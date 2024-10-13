import { type StateNotifier } from '@foundation/core/system/state/state-notifier';
import React, { createContext, useCallback, useRef } from 'react';

/**
 * Type representing a constructor for a StateNotifier class.
 * @template S - The state type.
 * @template T - The StateNotifier type.
 */
export type StateNotifierClassConstructor<S, T extends StateNotifier<S>> = abstract new (...args: any[]) => T;

/**
 * Type representing a map of state notifiers.
 */
export type StateNotifiers = Map<symbol, StateNotifier<any>>;

/**
 * Interface representing the handler for state notifiers.
 */
export interface StateNotifiersHandler {
    /**
     * Adds a notifier to the map.
     * @param {symbol} key - The key for the notifier.
     * @param {StateNotifier<any>} notifier - The notifier to add.
     */
    addNotifier: (key: symbol, notifier: StateNotifier<any>) => void;

    /**
     * Removes a notifier from the map.
     * @param {symbol} key - The key for the notifier.
     */
    removeNotifier: (key: symbol) => void;
}

/**
 * Context for state notifiers.
 */
export const StateNotifiersContext = createContext<StateNotifiers>(new Map());

/**
 * Context for state notifiers handler.
 */
export const StateNotifiersHandlerContext = createContext<StateNotifiersHandler>({
    addNotifier: () => { },
    removeNotifier: () => { }
});

/**
 * Props for the StateNotifiersProvider component.
 */
interface StateNotifiersProviderProps {
    /**
     * The child components.
     */
    children: React.ReactNode;

    /**
     * The initial state notifiers.
     */
    notifiers: Array<[symbol, StateNotifier]>;
}

/**
 * Provider component for state notifiers.
 * @param {StateNotifiersProviderProps} props - The props for the component.
 * @returns {JSX.Element} The provider component.
 */
export const StateNotifiersProvider: React.FC<StateNotifiersProviderProps> = ({
    children,
    notifiers,
}: StateNotifiersProviderProps) => {
    const notifiersRef = useRef<StateNotifiers>(new Map(notifiers));

    const addNotifier = useCallback((key: symbol, notifier: StateNotifier<any>) => {
        notifiersRef.current.set(key, notifier);
    }, [notifiersRef]);

    const removeNotifier = useCallback((key: symbol) => {
        notifiersRef.current.delete(key);
    }, [notifiersRef]);

    return (
        <StateNotifiersHandlerContext.Provider value={{ addNotifier, removeNotifier }}>
            <StateNotifiersContext.Provider value={notifiersRef.current}>
                {children}
            </StateNotifiersContext.Provider>
        </StateNotifiersHandlerContext.Provider>
    );
};
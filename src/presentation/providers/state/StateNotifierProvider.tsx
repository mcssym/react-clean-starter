
import { type StateNotifier } from 'foundation/core/system/state/StateNotifier';
import React, { createContext, useCallback, useRef } from 'react';

export type StateNotifierClassConstructor<S, T extends StateNotifier<S>> = abstract new (...args: any[]) => T;

export interface StateNotifiers extends Map<symbol, StateNotifier<any>> { }
export interface StateNotifiersHandler {
    addNotifier: (key: symbol, notifier: StateNotifier<any>) => void;
    removeNotifier: (key: symbol) => void;
}

export const StateNotifiersContext = createContext<StateNotifiers>(new Map());
export const StateNotifiersHandlerContext = createContext<StateNotifiersHandler>({
    addNotifier: () => { },
    removeNotifier: () => { }
});

interface StateNotifiersProviderProps {
    children: React.ReactNode;
    notifiers: Array<[symbol, StateNotifier]>;
}

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

    return <StateNotifiersHandlerContext.Provider value={{
        addNotifier,
        removeNotifier
    }} >
        <StateNotifiersContext.Provider value={notifiersRef.current}>{children}</StateNotifiersContext.Provider>
    </StateNotifiersHandlerContext.Provider>;
};

import { type StateNotifier, type StateNotifierStateType } from 'foundation/core/system/state/StateNotifier';
import { StateNotifiersContext, StateNotifiersHandlerContext, type StateNotifiersHandler } from 'presentation/providers/state/StateNotifierProvider';
import { useContext } from 'react';
import { map } from 'rxjs';
import { useObservable } from '../use-observable';

export const useSNHandlerContext = (): StateNotifiersHandler => {
    return useContext(StateNotifiersHandlerContext);
};

export const useSN = <T extends StateNotifier<StateNotifierStateType<T>>>(notifier: symbol): T => {
    const notifiers = useContext(StateNotifiersContext);

    if (!notifiers.has(notifier)) {
        throw new Error(`StateNotifier Symbol(${notifier.description ?? notifier.toString()}) is not in the context.`);
    }

    return notifiers.get(notifier) as T;
};

export const useSNState = <T extends StateNotifier<StateNotifierStateType<T>>>(
    notifier: symbol
): StateNotifierStateType<T> => {
    const stateNotifier = useSN(notifier);
    const initial = stateNotifier.state;
    const state = useObservable(stateNotifier.observable, initial);

    return state ?? initial;
};

export const useSNSelector = <R, T extends StateNotifier<StateNotifierStateType<T>>>(
    notifier: symbol,
    selector: (state: StateNotifierStateType<T>) => R
): R => {
    const stateNotifier = useSN(notifier);
    const initial = selector(stateNotifier.state);
    const state = useObservable(stateNotifier.observable.pipe(map(s => selector(s))), initial);

    return state ?? initial;
};

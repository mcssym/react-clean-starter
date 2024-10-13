
import type { StateNotifier, StateNotifierStateType } from '@foundation/core/system/state/state-notifier';
import type { ViewModel } from '@foundation/core/system/state/view-model';
import { useSN, useSNSelector, useSNState } from './use-state-notifier';

export const useVMState = <T extends ViewModel<StateNotifierStateType<T>>>(
    notifier: symbol
): StateNotifierStateType<T> => {
    return useSNState(notifier);
};

export const useVMSelector = <R, T extends ViewModel<StateNotifierStateType<T>>>(
    notifier: symbol,
    selector: (state: StateNotifierStateType<T>) => R,
): R => {
    return useSNSelector(notifier, selector);
};

export const useViewModel = <T extends StateNotifier<any>>(notifier: symbol): T => {
    return useSN(notifier);
};

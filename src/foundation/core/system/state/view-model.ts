import { StateNotifier } from './state-notifier';

/**
 * ViewModel is a class that allows you to manage the state of a view.
 * 
 * @template T The type of the state.
 */
export abstract class ViewModel<T = unknown> extends StateNotifier<T> {

    /**
     * Notify the view model that it has been mounted.
     */
    onMount(): void { }

    /**
     * Notify the view model that it has been unmounted.
     */
    onUnmount(): void { }
}

import { StateNotifier } from './state-notifier';

export abstract class ViewModel<T = unknown> extends StateNotifier<T> {
    onMount(): void { }
    onUnmount(): void { }
}

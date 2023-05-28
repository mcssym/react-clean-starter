import { StateNotifier } from './StateNotifier';

export abstract class ViewModel<T = unknown> extends StateNotifier<T> {
    onMount(): void { }
    onUnmount(): void { }
}

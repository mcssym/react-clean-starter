import { ToastService, type ToastData } from '@foundation/core/system/navigation/toast-service';
import { StateNotifier } from '@foundation/core/system/state/state-notifier';
import { removeKey, uniqueId } from '@foundation/supports/helpers';

/**
 * Error thrown when there is no listener in your view to show the toasts.
 */
export class NoToastListenerError extends Error { }

export interface ToastAlertData extends ToastData {
    close: () => void;
}

export type ToastState = Record<string, ToastAlertData>;

export class ToastStateNotifier extends StateNotifier<ToastState> {
    static readonly token = Symbol('ToastStateNotifier');

    constructor() {
        super(properties => Object.assign({}, properties));
    }
}

const NOMINAL = Symbol('ToastController');
export class ToastController extends ToastService {
    [NOMINAL]: symbol = NOMINAL;

    static readonly token: symbol = Symbol('ToastController');

    readonly #stateNotifier: ToastStateNotifier;

    constructor() {
        super();
        this.#stateNotifier = new ToastStateNotifier();
    }

    get notifier(): ToastStateNotifier {
        return this.#stateNotifier;
    }

    override async show(data: ToastData): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (!this.notifier.hasListeners) {
                reject(new NoToastListenerError());
            }

            const key: string = uniqueId('toast-alert-');
            this.notifier.setState({
                ...this.notifier.state,
                [key]: {
                    ...data,
                    close: () => {
                        this.#removeToast(key);
                        resolve();
                    }
                }
            });
        });
    }

    #removeToast(key: string): void {
        this.#stateNotifier.setState(removeKey(key, this.#stateNotifier.state));
    }
}

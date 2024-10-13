import { ToastService, type ToastData } from '@foundation/core/system/navigation/toast-service';
import { StateNotifier } from '@foundation/core/system/state/state-notifier';
import { removeKey, uniqueId } from '@foundation/supports/helpers';

/**
 * Error thrown when there is no listener in your view to show the toasts.
 */
export class NoToastListenerError extends Error { }

/**
 * Interface representing the data for a toast alert.
 */
export interface ToastAlertData extends ToastData {
    /**
     * Function to close the toast alert.
     */
    close: () => void;
}

/**
 * Type representing the state of toasts.
 */
export type ToastState = Record<string, ToastAlertData>;

/**
 * Class responsible for managing the state of toast alerts.
 */
export class ToastStateNotifier extends StateNotifier<ToastState> {
    /**
     * Unique token for the ToastStateNotifier.
     */
    static readonly token = Symbol('ToastStateNotifier');

    /**
     * Constructor for ToastStateNotifier.
     */
    constructor() {
        super(properties => Object.assign({}, properties));
    }
}

const NOMINAL = Symbol('ToastController');

/**
 * Controller class for managing toast alerts.
 */
export class ToastController extends ToastService {
    [NOMINAL]: symbol = NOMINAL;

    /**
     * Unique token for the ToastController.
     */
    static readonly token: symbol = Symbol('ToastController');

    /**
     * Notifier for the state of toast alerts.
     */
    readonly #stateNotifier: ToastStateNotifier;

    /**
     * Constructor for ToastController.
     */
    constructor() {
        super();
        this.#stateNotifier = new ToastStateNotifier();
    }

    /**
     * Getter for the state notifier.
     * @returns {ToastStateNotifier} The state notifier.
     */
    get notifier(): ToastStateNotifier {
        return this.#stateNotifier;
    }

    /**
     * Shows a toast alert.
     * @param {ToastData} data - The data for the toast alert.
     * @returns {Promise<void>} A promise that resolves when the toast is closed.
     * @throws {NoToastListenerError} If there are no listeners for the toast.
     */
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

    /**
     * Removes a toast alert by its key.
     * @param {string} key - The key of the toast alert to remove.
     */
    #removeToast(key: string): void {
        this.#stateNotifier.setState(removeKey(key, this.#stateNotifier.state));
    }
}
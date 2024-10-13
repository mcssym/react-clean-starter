import { type AlertData, type ConfirmData, DialogService, type PromptData } from '@foundation/core/system/navigation/dialog-service';
import { StateNotifier } from '@foundation/core/system/state/state-notifier';
import { removeKey, uniqueId } from '@foundation/supports/helpers';
import type { Nullable } from '@foundation/supports/types';

/**
 * Error thrown when there is no listener in your view to show the dialogs.
 */
export class NoDialogListenerError extends Error { }

export enum DialogType {
    alert,
    confirm,
    prompt
}

interface BaseDialogData {
    type: DialogType;
}

/**
 * Types representing alert dialog data.
 */
export interface AlertDialogData extends BaseDialogData, AlertData {
    type: DialogType.alert;
    close: () => void;
}

/**
 * Types representing confirm of dialog data.
 */
export interface ConfirmDialogData extends BaseDialogData, ConfirmData {
    type: DialogType.confirm;
    close: (result?: boolean) => void;
}

/**
 * Types representing prompt dialog data.
 */
export interface PromptDialogData extends BaseDialogData, PromptData {
    type: DialogType.prompt;
    close: (result?: string) => void;
}

/**
 * Types representing different kinds of dialog data.
 */
export type DialogData = AlertDialogData | ConfirmDialogData | PromptDialogData;

/**
 * Type representing the state of dialogs.
 */
export type DialogState = Record<string, DialogData>;

/**
 * Class responsible for notifying state changes in dialogs.
 */
export class DialogStateNotifier extends StateNotifier<DialogState> {
    static readonly token = Symbol('DialogStateNotifier');

    constructor() {
        super(properties => Object.assign({}, properties));
    }
}

/**
 * Symbol used to nominally type the DialogController.
 */
const NOMINAL = Symbol('DialogController');

/**
 * Class responsible for controlling dialog interactions.
 */
export class DialogController extends DialogService {
    [NOMINAL]: symbol = NOMINAL;

    static readonly token: symbol = Symbol('DialogController');

    readonly #stateNotifier: DialogStateNotifier;

    constructor() {
        super();
        this.#stateNotifier = new DialogStateNotifier();
    }

    /**
     * Getter for the state notifier.
     */
    get notifier(): DialogStateNotifier {
        return this.#stateNotifier;
    }

    /**
     * Displays an alert dialog.
     * @param data - The data for the alert dialog.
     * @returns A promise that resolves when the dialog is closed.
     */
    override async alert(data: AlertData): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (!this.notifier.hasListeners) {
                reject(new NoDialogListenerError());
            }

            const key: string = uniqueId('dialog-alert-');
            this.notifier.setState({
                ...this.notifier.state,
                [key]: {
                    ...data,
                    type: DialogType.alert,
                    close: () => {
                        this.#removeDialog(key);
                        resolve();
                    }
                }
            });
        });
    }

    /**
     * Displays a confirm dialog.
     * @param data - The data for the confirm dialog.
     * @returns A promise that resolves to a boolean indicating the user's choice.
     */
    override async confirm(data: ConfirmData): Promise<Nullable<boolean>> {
        return await new Promise<Nullable<boolean>>((resolve, reject) => {
            if (!this.notifier.hasListeners) {
                reject(new NoDialogListenerError());
            }

            const key: string = uniqueId('dialog-confirm-');
            this.notifier.setState({
                ...this.#stateNotifier.state,
                [key]: {
                    ...data,
                    type: DialogType.confirm,
                    close: result => {
                        this.#removeDialog(key);
                        resolve(result ?? null);
                    }
                }
            });
        });
    }

    /**
     * Displays a prompt dialog.
     * @param data - The data for the prompt dialog.
     * @returns A promise that resolves to the user's input or null.
     */
    override async prompt(data: PromptData): Promise<Nullable<string>> {
        return await new Promise<Nullable<string>>((resolve, reject) => {
            if (!this.notifier.hasListeners) {
                reject(new NoDialogListenerError());
            }

            const key: string = uniqueId('dialog-prompt-');
            this.notifier.setState({
                ...this.#stateNotifier.state,
                [key]: {
                    ...data,
                    type: DialogType.prompt,
                    close: result => {
                        this.#removeDialog(key);
                        resolve(result ?? null);
                    }
                }
            });
        });
    }

    /**
     * Removes a dialog from the state.
     * @param key - The key of the dialog to remove.
     */
    #removeDialog(key: string): void {
        this.#stateNotifier.setState(removeKey(key, this.#stateNotifier.state));
    }
}

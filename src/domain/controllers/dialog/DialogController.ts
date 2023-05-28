import { type AlertData, type ConfirmData, DialogService, type PromptData } from 'foundation/core/system/navigation/DialogService';
import { StateNotifier } from 'foundation/core/system/state/StateNotifier';
import { removeKey, uniqueId } from 'foundation/supports/helpers';
import { type Nullable } from 'foundation/supports/types';

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

export interface AlertDialogData extends BaseDialogData, AlertData {
    type: DialogType.alert;
    close: () => void;
}

export interface ConfirmDialogData extends BaseDialogData, ConfirmData {
    type: DialogType.confirm;
    close: (result?: boolean) => void;
}

export interface PromptDialogData extends BaseDialogData, PromptData {
    type: DialogType.prompt;
    close: (result?: string) => void;
}

export type DialogData = AlertDialogData | ConfirmDialogData | PromptDialogData;

export type DialogState = Record<string, DialogData>;

export class DialogStateNotifier extends StateNotifier<DialogState> {
    static readonly token = Symbol('DialogStateNotifier');

    constructor() {
        super(properties => Object.assign({}, properties));
    }
}

const NOMINAL = Symbol('DialogController');
export class DialogController extends DialogService {
    [NOMINAL]: symbol = NOMINAL;

    static readonly token: symbol = Symbol('DialogController');

    #stateNotifier: DialogStateNotifier;

    constructor() {
        super();
        this.#stateNotifier = new DialogStateNotifier();
    }

    get notifier(): DialogStateNotifier {
        return this.#stateNotifier;
    }

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

    #removeDialog(key: string): void {
        this.#stateNotifier.setState(removeKey(key, this.#stateNotifier.state));
    }
}

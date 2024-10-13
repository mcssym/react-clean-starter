import type { Nullable } from '@foundation/supports/types';

export const DIALOG_SERVICE_TOKEN = Symbol('DIALOG_SERVICE_TOKEN');

export interface AlertData {
    title?: string;
    message: string;
}

export interface ConfirmData {
    title?: string;
    message: string;
    yesLabel?: string;
    noLabel?: string;
}

export interface PromptData {
    title?: string;
    message: string;
    doneLabel?: string;
    cancelLabel?: string;
}

export abstract class DialogService {
    abstract alert(data: AlertData): Promise<void>;
    abstract confirm(data: ConfirmData): Promise<Nullable<boolean>>;
    abstract prompt(data: PromptData): Promise<Nullable<string>>;
}

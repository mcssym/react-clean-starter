import type { Nullable } from '@foundation/supports/types';

/**
 * Token used to identify the DialogService.
 */
export const DIALOG_SERVICE_TOKEN = Symbol('DIALOG_SERVICE_TOKEN');

/**
 * Interface representing the data for an alert dialog.
 */
export interface AlertData {
    /**
     * The title of the alert dialog.
     */
    title?: string;

    /**
     * The message of the alert dialog.
     */
    message: string;
}

/**
 * Interface representing the data for a confirm dialog.
 */
export interface ConfirmData {
    /**
     * The title of the confirm dialog.
     */
    title?: string;

    /**
     * The message of the confirm dialog.
     */
    message: string;

    /**
     * The label for the "yes" button.
     */
    yesLabel?: string;

    /**
     * The label for the "no" button.
     */
    noLabel?: string;
}

/**
 * Interface representing the data for a prompt dialog.
 */
export interface PromptData {
    /**
     * The title of the prompt dialog.
     */
    title?: string;

    /**
     * The message of the prompt dialog.
     */
    message: string;

    /**
     * The label for the "done" button.
     */
    doneLabel?: string;

    /**
     * The label for the "cancel" button.
     */
    cancelLabel?: string;
}

/**
 * Abstract class representing a dialog service.
 */
export abstract class DialogService {
    /**
     * Shows an alert dialog.
     * @param {AlertData} data - The data for the alert dialog.
     * @returns {Promise<void>} A promise that resolves when the alert dialog is closed.
     */
    abstract alert(data: AlertData): Promise<void>;

    /**
     * Shows a confirm dialog.
     * @param {ConfirmData} data - The data for the confirm dialog.
     * @returns {Promise<Nullable<boolean>>} A promise that resolves to true if confirmed, false if not, or null if canceled.
     */
    abstract confirm(data: ConfirmData): Promise<Nullable<boolean>>;

    /**
     * Shows a prompt dialog.
     * @param {PromptData} data - The data for the prompt dialog.
     * @returns {Promise<Nullable<string>>} A promise that resolves to the input value if confirmed, or null if canceled.
     */
    abstract prompt(data: PromptData): Promise<Nullable<string>>;
}
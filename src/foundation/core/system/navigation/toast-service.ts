/**
 * Token used to identify the ToastService.
 */
export const TOAST_SERVICE_TOKEN = Symbol('TOAST_SERVICE_TOKEN');

/**
 * Enum representing the types of toasts.
 */
export enum ToastType {
    success,
    warning,
    error,
    info
}

/**
 * Interface representing the data for a toast.
 */
export interface ToastData {
    /**
     * The type of the toast.
     */
    type: ToastType;

    /**
     * The message to display in the toast.
     */
    message: string;

    /**
     * The duration of the toast in milliseconds.
     * If `null`, the toast will not automatically close.
     */
    duration?: number | null;
}

/**
 * Abstract class representing a toast service.
 */
export abstract class ToastService {
    /**
     * Shows a toast with the specified data.
     * @param {ToastData} data - The data for the toast.
     * @returns {Promise<void>} A promise that resolves when the toast is shown.
     */
    abstract show(data: ToastData): Promise<void>;
}
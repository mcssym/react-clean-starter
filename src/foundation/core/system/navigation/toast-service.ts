export const TOAST_SERVICE_TOKEN = Symbol('TOAST_SERVICE_TOKEN');

export enum ToastType {
    success,
    warning,
    error,
    info
}

export interface ToastData {
    type: ToastType;
    message: string;
    /**
     * The duration of the toast in milliseconds.
     * 
     * If `null`, the toast will not automatically close.
     */
    duration?: number | null;
}

export abstract class ToastService {
    abstract show(data: ToastData): Promise<void>;
}

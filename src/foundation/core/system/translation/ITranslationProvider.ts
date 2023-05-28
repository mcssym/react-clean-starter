export interface ITranslationProvider {
    singular: (key: string, params?: Record<string, string>) => string;
    plural: (key: string, count: number, params?: Record<string, string>) => string;
}

export const TranslationKeys = {
    logout: 'log_out',
    login: 'login',
    error: 'error',
    members: 'members',
    unknownError: 'unknown_error',
    name: 'name',
    username: 'username',
    message: 'message',
    send: 'send',
    logoutConfirmationMessage: 'log_out_confirmation_message'
}

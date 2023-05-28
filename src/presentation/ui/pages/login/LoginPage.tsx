
import { ViewModelProvider } from 'presentation/providers/state/ViewModelProvider';
import React from 'react';
import { LoginView } from './LoginView';
import { LoginViewModel } from './LoginViewModel';
import { useInjection } from 'presentation/providers/ServiceContainerProvider';
import { DIALOG_SERVICE_TOKEN, type DialogService } from 'foundation/core/system/navigation/DialogService';
import { TRANSLATOR_SERVICE_TOKEN, type TranslatorService } from 'foundation/core/system/translation/TranslatorService';
import { AUTH_USE_CASES_TOKEN, type IAuthUseCases } from 'domain/use_cases/AuthUseCases';

export const LoginPage: React.FC = (): JSX.Element => {
    const dialog = useInjection<DialogService>(DIALOG_SERVICE_TOKEN);
    const translator = useInjection<TranslatorService>(TRANSLATOR_SERVICE_TOKEN);
    const useCase = useInjection<IAuthUseCases>(AUTH_USE_CASES_TOKEN);

    return (
        <ViewModelProvider token={LoginViewModel.token} create={() => {
            return new LoginViewModel(
                useCase,
                dialog,
                translator,
            );
        }} >
            <LoginView />
        </ViewModelProvider>
    );
}

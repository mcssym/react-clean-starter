
import { DIALOG_SERVICE_TOKEN, type DialogService } from '@foundation/core/system/navigation/dialog-service';
import { TRANSLATOR_SERVICE_TOKEN, type TranslatorService } from '@foundation/core/system/translation/translator-service';
import { useInjection } from '@presentation/providers/service-container.provider';
import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { LoginView } from './login-view';
import { LoginViewModel } from './login-viewmodel';
import { LoginUseCase } from '@domain/use_cases/auth/login.use_case';
import { NAVIGATION_SERVICE_TOKEN, NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { Config } from '@foundation/core/config';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import { useI18n } from '@presentation/hooks/use-i18n';
import Head from '@uiw/react-head';

export const LoginPage: React.FC = (): JSX.Element => {
    const dialog = useInjection<DialogService>(DIALOG_SERVICE_TOKEN);
    const translator = useInjection<TranslatorService>(TRANSLATOR_SERVICE_TOKEN);
    const useCase = useInjection<LoginUseCase>(LoginUseCase.token);
    const navigation = useInjection<NavigationService>(NAVIGATION_SERVICE_TOKEN);
    const config = useInjection<Config>(Config.token);
    const t = useI18n();

    return (
        <ViewModelProvider token={LoginViewModel.token} create={() => {
            return new LoginViewModel(
                {
                    useCase,
                    dialog,
                    translator,
                    navigation,
                }
            );
        }} >
            <Head>
                <Head.Title>{t(TranslationKeys.login)} | {config.appName}</Head.Title>
            </Head>
            <LoginView />
        </ViewModelProvider>
    );
}

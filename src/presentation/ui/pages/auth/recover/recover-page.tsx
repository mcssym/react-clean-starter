
import { RecoverUseCase } from '@domain/use_cases/auth/recover.use_case';
import { DIALOG_SERVICE_TOKEN, type DialogService } from '@foundation/core/system/navigation/dialog-service';
import { TRANSLATOR_SERVICE_TOKEN, type TranslatorService } from '@foundation/core/system/translation/translator-service';
import { useInjection } from '@presentation/providers/service-container.provider';
import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { RecoverView } from './recover-view';
import { AuthRecoverViewModel } from './recover-viewmodel';
import { Config } from '@foundation/core/config';
import { useI18n } from '@presentation/hooks/use-i18n';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import Head from '@uiw/react-head';

export const AuthRecoverPage: React.FC = (): JSX.Element => {
    const dialog = useInjection<DialogService>(DIALOG_SERVICE_TOKEN);
    const translator = useInjection<TranslatorService>(TRANSLATOR_SERVICE_TOKEN);
    const useCase = useInjection<RecoverUseCase>(RecoverUseCase.token);
    const config = useInjection<Config>(Config.token);
    const t = useI18n();

    return (
        <ViewModelProvider token={AuthRecoverViewModel.token} create={() => {
            return new AuthRecoverViewModel(
                useCase,
                dialog,
                translator,
            );
        }} >
            <Head>
                <Head.Title>{t(TranslationKeys.recoverAccount)} | {config.appName}</Head.Title>
            </Head>
            <RecoverView />
        </ViewModelProvider>
    );
}


import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { AppointmentView } from './appointment-view';
import { AppointmentViewModel } from './appointment-viewmodel';
import { Config } from '@foundation/core/config';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import { useI18n } from '@presentation/hooks/use-i18n';
import { useInjection } from '@presentation/providers/service-container.provider';
import Head from '@uiw/react-head';

export const AppointmentPage: React.FC = (): JSX.Element => {
    const config = useInjection<Config>(Config.token);
    const t = useI18n();

    return (
        <ViewModelProvider token={AppointmentViewModel.token} create={() => {
            return new AppointmentViewModel();
        }} >
            <Head>
                <Head.Title>{t(TranslationKeys.appointments)} | {config.appName}</Head.Title>
            </Head>
            <AppointmentView />
        </ViewModelProvider>
    );
}


import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { DashboardView } from './dashboard-view';
import { DashboardViewModel } from './dashboard-viewmodel';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import { useI18n } from '@presentation/hooks/use-i18n';
import { useInjection } from '@presentation/providers/service-container.provider';
import Head from '@uiw/react-head';
import { Config } from '@foundation/core/config';

export const DashboardPage: React.FC = (): JSX.Element => {
    const config = useInjection<Config>(Config.token);
    const t = useI18n();

    return (
        <ViewModelProvider token={DashboardViewModel.token} create={() => {
            return new DashboardViewModel();
        }} >
            <Head>
                <Head.Title>{t(TranslationKeys.dashboard)} | {config.appName}</Head.Title>
            </Head>
            <DashboardView />
        </ViewModelProvider>
    );
}

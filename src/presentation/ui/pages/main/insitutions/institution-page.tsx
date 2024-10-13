
import { ViewModelProvider } from '@presentation/providers/state/view-model.provider';
import React from 'react';
import { InstitutionView } from './institution-view';
import { InstitutionViewModel } from './institution-viewmodel';
import { Config } from '@foundation/core/config';
import { TranslationKeys } from '@foundation/core/system/translation/translation-keys';
import { useI18n } from '@presentation/hooks/use-i18n';
import { useInjection } from '@presentation/providers/service-container.provider';
import Head from '@uiw/react-head';
import { TRANSLATOR_SERVICE_TOKEN, TranslatorService } from '@foundation/core/system/translation/translator-service';
import { TOAST_SERVICE_TOKEN, ToastService } from '@foundation/core/system/navigation/toast-service';
import { InstitutionsEndpoint } from '@data/resources/remote/http/endpoints/institutions.endpoint';
import { NAVIGATION_SERVICE_TOKEN, NavigationService } from '@foundation/core/system/navigation/navigation-service';

export const InstitutionPage: React.FC = (): JSX.Element => {
    const translator = useInjection<TranslatorService>(TRANSLATOR_SERVICE_TOKEN);
    const toastService = useInjection<ToastService>(TOAST_SERVICE_TOKEN);
    const endpoint = useInjection<InstitutionsEndpoint>(InstitutionsEndpoint.token);
    const navigator = useInjection<NavigationService>(NAVIGATION_SERVICE_TOKEN);
    const config = useInjection<Config>(Config.token);
    const t = useI18n();

    return (
        <ViewModelProvider token={InstitutionViewModel.token} create={() => {
            return new InstitutionViewModel({
                endpoint: endpoint,
                toastService,
                translator,
                navigator,
            });
        }} >
            <Head>
                <Head.Title>{t(TranslationKeys.institutions)} | {config.appName}</Head.Title>
            </Head>
            <InstitutionView />
        </ViewModelProvider>
    );
}

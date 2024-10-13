import { DialogController, DialogStateNotifier } from '@application/controllers/dialog/dialog.controller';
import { loadInjections } from '@application/injections/injections-loader';
import { AuthManager } from '@application/managers/auth.manager';
import { DeviceInfoService } from '@application/services/installation/device-info.service';
import { InstallationService } from '@application/services/installation/installation.service';
import { I18NextTranslatorService } from '@application/services/translation/i18-next-translator.service';
import { ServiceContainer } from '@foundation/core/di/service-container';
import type { StateNotifier } from '@foundation/core/system/state/state-notifier';
import { ThemeProvider } from '@material-tailwind/react';
import DialogsProvider from '@presentation/providers/dialogs.provider';
import { RouterProvider } from '@presentation/providers/router.provider';
import { ServiceContainerProvider } from '@presentation/providers/service-container.provider';
import { StateNotifiersProvider } from '@presentation/providers/state/state-notifier.provider';
import appTheme from '@presentation/styles/theme';
import 'es6-shim';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';
import './index.css';
import reportWebVitals from './report-web-vitals';
import ToastsProvider from '@presentation/providers/toasts.provider';
import { ToastController, ToastStateNotifier } from '@application/controllers/toast/toast.controller';

const IndeterminateProgressBar = (): JSX.Element => {
    return (
        <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
    );
};

const App: React.FC = (): JSX.Element => {
    const container = useRef<ServiceContainer>((() => {
        const container = new ServiceContainer();
        container.load(loadInjections());
        return container;
    })());
    const notifiers = useRef<Array<[symbol, StateNotifier<any>]>>([
        [DialogStateNotifier.token, container.current.resolve<DialogController>(DialogController.token).notifier],
        [ToastStateNotifier.token, container.current.resolve<ToastController>(ToastController.token).notifier],
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const translator = container.current.resolve<I18NextTranslatorService>(I18NextTranslatorService.token);
        const authManager = container.current.resolve<AuthManager>(AuthManager.token);
        const deviceInfoService = container.current.resolve<DeviceInfoService>(DeviceInfoService.token);
        const installationService = container.current.resolve<InstallationService>(InstallationService.token);
        (async () => {
            await deviceInfoService.initialize();
            await installationService.initialize();
            await Promise.allSettled([
                translator.initialize(),
                authManager.initialize(),
            ]);
            setLoading(false);
        })().catch(() => { });
    }, []);

    if (loading) {
        return <div className="container mx-auto p-4">
            <IndeterminateProgressBar />
        </div>;
    }

    return (
        <ServiceContainerProvider container={container.current}>
            <React.StrictMode>
                <ThemeProvider value={appTheme} >
                    <StateNotifiersProvider
                        notifiers={notifiers.current}
                    >
                        <DialogsProvider>
                            <ToastsProvider>
                                <RouterProvider />
                            </ToastsProvider>
                        </DialogsProvider>
                    </StateNotifiersProvider>
                </ThemeProvider>
            </React.StrictMode>
        </ServiceContainerProvider>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

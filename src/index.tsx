import 'reflect-metadata'
import 'es6-shim'
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ServiceContainer } from 'foundation/core/di/ServiceContainer';
import { ServiceContainerProvider } from 'presentation/providers/ServiceContainerProvider';
import { StateNotifiersProvider } from 'presentation/providers/state/StateNotifierProvider';
import type { StateNotifier } from 'foundation/core/system/state/StateNotifier';
import { loadInjections } from 'application/injections/injections-loader';
import { I18NextTranslatorService } from 'domain/services/translation/I18NextTranslatorService';
import { WebSocketClientService } from 'domain/services/io/ws/WebSocketClientService';
import { RouterProvider } from 'presentation/providers/RouterProvider';
import { DialogController, DialogStateNotifier } from 'domain/controllers/dialog/DialogController';
import DialogsProvider from 'presentation/providers/DialogsProvider';
import { AuthManager } from 'domain/managers/AuthManager';
import { ThemeProvider } from '@material-tailwind/react';
import { LocalMemberProvider } from 'application/injections/impl/locals';

const IndeterminateProgressBar = (): JSX.Element => {
    return (
        <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse"></div>
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
        [DialogStateNotifier.token, container.current.resolve<DialogController>(DialogController.token).notifier]
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const translator = container.current.resolve<I18NextTranslatorService>(I18NextTranslatorService.token);
        const authManager = container.current.resolve<AuthManager>(AuthManager.token);
        const wsService = container.current.resolve<WebSocketClientService>(WebSocketClientService.token);
        const memberProvider = container.current.resolve<LocalMemberProvider>(LocalMemberProvider.token);
        (async () => {
            memberProvider.initialize();
            await Promise.allSettled([
                translator.initialize(),
                authManager.initialize(),
            ]);
            wsService.initialize();
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
                <ThemeProvider>
                    <StateNotifiersProvider
                        notifiers={notifiers.current}
                    >
                        <DialogsProvider>
                            <RouterProvider />
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

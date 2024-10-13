
import { Routes } from '@application/controllers/navigation/routes-provider';
import { AuthManager } from '@application/managers/auth.manager';
import { type IInjectionResolver } from '@foundation/core/di/injections';
import { redirect, type Router } from '@remix-run/router';
import { LoginPage } from '@presentation/ui/pages/auth/login/login-page';
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider as LegacyRouterProvider
} from 'react-router-dom';
import { useInjection } from './service-container.provider';
import { AuthRecoverPage } from '@presentation/ui/pages/auth/recover/recover-page';
import { MainPage } from '@presentation/ui/pages/main/main-page';
import { DashboardPage } from '@presentation/ui/pages/main/dashboard/dashboard-page';
import { InstitutionPage } from '@presentation/ui/pages/main/insitutions/institution-page';
import { AppointmentPage } from '@presentation/ui/pages/main/appointments/appointment-page';

const NotFoundDialog: React.FC = (): JSX.Element => {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">{"Sorry, we couldn't find the page you're looking for."}</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
                </div>
            </div>
        </main>
    );
};

export const REACT_ROUTER_PROVIDER_TOKEN = Symbol('REACT_ROUTER_PROVIDER_TOKEN');

export interface IReactRouterProvider {
    router: Router;
}

export const createRouter = (resolver: IInjectionResolver): Router => {
    return createBrowserRouter([
        {
            path: Routes.main.home.path,
            element: <MainPage />,
            loader: async () => {
                const manager = resolver.resolve<AuthManager>(AuthManager.token);
                if (!manager.authenticated) {
                    return redirect(Routes.auth.logIn.resolve());
                }
                return null;
            },
            children: [
                {
                    path: Routes.main.dashboard.path,
                    element: <DashboardPage />,
                    index: true
                },
                {
                    path: Routes.main.institutions.path,
                    element: <InstitutionPage />,
                    index: true
                },
                {
                    path: Routes.main.appointments.path,
                    element: <AppointmentPage />,
                    index: true
                },
            ]
        },
        {
            path: '/auth',
            children: [
                {
                    path: Routes.auth.logIn.path,
                    element: <LoginPage />,
                    index: true
                },
                {
                    path: Routes.auth.recover.path,
                    element: <AuthRecoverPage />
                },
            ]
        }
    ]);
}

export const RouterProvider: React.FC = (): JSX.Element => {
    const reactRouterProvider = useInjection<IReactRouterProvider>(REACT_ROUTER_PROVIDER_TOKEN);

    return <LegacyRouterProvider fallbackElement={<NotFoundDialog />} router={reactRouterProvider.router} />;
};

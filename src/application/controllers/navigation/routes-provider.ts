import { generatePath, matchPath } from 'react-router-dom';

abstract class BaseRouteData {
    readonly path: string;

    constructor(params: { path: string }) {
        this.path = params.path;
    }

    abstract matches(path: string): boolean;
}

export class RouteData extends BaseRouteData {
    override matches(path: string): boolean {
        return matchPath(this.path, path) != null;
    }

    resolve(): string {
        return generatePath(this.path);
    }
}

export class ParamRouteData<T = Record<string, string>> extends BaseRouteData {
    resolve(params: T): string {
        return generatePath(this.path, params as unknown as Record<string, string>);
    }

    override matches(path: string): boolean {
        return matchPath(this.path, path) != null;
    }
}

export const Routes = {
    main: {
        home: new RouteData({
            path: '/',
        }),
        dashboard: new RouteData({
            path: '/',
        }),
        appointments: new RouteData({
            path: '/appointments',
        }),
        institutions: new RouteData({
            path: '/institutions',
        }),
        profile: new RouteData({
            path: '/profile',
        }),
    },
    auth: {
        logIn: new RouteData({
            path: '/auth/login',
        }),
        recover: new RouteData({
            path: '/auth/recover',
        }),
    },

};

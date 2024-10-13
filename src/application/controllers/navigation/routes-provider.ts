import { generatePath, matchPath } from 'react-router-dom';

/**
 * Abstract base class representing route data.
 */
abstract class BaseRouteData {
    readonly path: string;

    /**
     * Constructs a new BaseRouteData instance.
     * @param params - The parameters for the route.
     */
    constructor(params: { path: string }) {
        this.path = params.path;
    }

    /**
     * Abstract method to check if the route matches a given path.
     * @param path - The path to check.
     * @returns True if the path matches, false otherwise.
     */
    abstract matches(path: string): boolean;
}

/**
 * Class representing route data without parameters.
 */
export class RouteData extends BaseRouteData {
    /**
     * Checks if the route matches a given path.
     * @param path - The path to check.
     * @returns True if the path matches, false otherwise.
     */
    override matches(path: string): boolean {
        return matchPath(this.path, path) != null;
    }

    /**
     * Resolves the route to a string path.
     * @returns The resolved path.
     */
    resolve(): string {
        return generatePath(this.path);
    }
}

/**
 * Class representing route data with parameters.
 * @template T - The type of the parameters.
 */
export class ParamRouteData<T = Record<string, string>> extends BaseRouteData {
    /**
     * Resolves the route to a string path with the given parameters.
     * @param params - The parameters to use for resolving the path.
     * @returns The resolved path.
     */
    resolve(params: T): string {
        return generatePath(this.path, params as unknown as Record<string, string>);
    }

    /**
     * Checks if the route matches a given path.
     * @param path - The path to check.
     * @returns True if the path matches, false otherwise.
     */
    override matches(path: string): boolean {
        return matchPath(this.path, path) != null;
    }
}

/**
 * Object containing predefined routes.
 */
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

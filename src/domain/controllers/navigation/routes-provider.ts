import { generatePath } from 'react-router-dom';

abstract class BaseRouteData {
    constructor(public readonly path: string) { }
}

export class RouteData extends BaseRouteData {
    resolve(): string {
        return generatePath(this.path);
    }
}

export class ParamRouteData<T = Record<string, string>> extends BaseRouteData {
    resolve(params: T): string {
        return generatePath(this.path, params as any);
    }
}

export const Routes = {
    home: new RouteData('/'),
    logIn: new RouteData('/login'),
};

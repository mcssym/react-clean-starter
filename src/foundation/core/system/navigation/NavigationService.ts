import { type Observable } from 'rxjs';

export const NAVIGATION_SERVICE_TOKEN = Symbol('NAVIGATION_SERVICE_TOKEN');

export interface NavigationData {
    currentPath: string;
    prevPath?: string;
}

export abstract class NavigationService {
    abstract goTo(path: string, replace?: boolean): void;
    abstract goBack(): void;
    abstract goForward(): void;
    abstract get onNavigationChange(): Observable<NavigationData>
    abstract get currentPath(): string;
    abstract isPathActive(path: string): boolean;
}

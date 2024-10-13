import type { Observable } from 'rxjs';

/**
 * Token used to identify the NavigationService.
 */
export const NAVIGATION_SERVICE_TOKEN = Symbol('NAVIGATION_SERVICE_TOKEN');

/**
 * Interface representing navigation data.
 */
export interface NavigationData {
    /**
     * The current path of the navigation.
     */
    currentPath: string;

    /**
     * The previous path of the navigation.
     */
    prevPath?: string;
}

/**
 * Abstract class representing a navigation service.
 */
export abstract class NavigationService {
    /**
     * Navigates to a specified path.
     * @param {string} path - The path to navigate to.
     * @param {boolean} [replace=false] - Whether to replace the current history entry.
     */
    abstract goTo(path: string, replace?: boolean): void;

    /**
     * Navigates back to the previous path.
     */
    abstract goBack(): void;

    /**
     * Navigates forward to the next path.
     */
    abstract goForward(): void;

    /**
     * Observable that emits navigation data changes.
     * @returns {Observable<NavigationData>} An observable that emits navigation data changes.
     */
    abstract get onNavigationChange(): Observable<NavigationData>;

    /**
     * Gets the current path.
     * @returns {string} The current path.
     */
    abstract get currentPath(): string;

    /**
     * Checks if a specified path is active.
     * @param {string} path - The path to check.
     * @returns {boolean} True if the path is active, false otherwise.
     */
    abstract isPathActive(path: string): boolean;

    /**
     * Updates the URL.
     * @param {URL} url - The new URL.
     * @param {boolean} [reload=false] - Whether to reload the page.
     */
    abstract updateUrl(url: URL, reload?: boolean): void;

    /**
     * Updates the search parameters of the URL.
     * @param {URLSearchParams} params - The new search parameters.
     * @param {boolean} [reload=false] - Whether to reload the page.
     */
    abstract updateSearchParams(params: URLSearchParams, reload?: boolean): void;
}
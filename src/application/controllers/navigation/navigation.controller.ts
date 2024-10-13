import { matchPath, type Router } from '@remix-run/router';
import { type NavigationData, NavigationService } from '@foundation/core/system/navigation/navigation-service';
import { Observable } from 'rxjs';

const NOMINAL = Symbol('NavigationController');

/**
 * Class responsible for controlling navigation interactions.
 */
export class NavigationController extends NavigationService {
    [NOMINAL]: symbol = NOMINAL;

    static readonly token: symbol = Symbol('NavigationController');

    readonly #router: Router;

    /**
     * Constructs a new NavigationController.
     * @param router - The router instance to use for navigation.
     */
    constructor(router: Router) {
        super();
        this.#router = router;
    }

    /**
     * Navigates to a specified path.
     * @param path - The path to navigate to.
     * @param replace - Whether to replace the current history entry.
     */
    override goTo(path: string, replace?: boolean): void {
        this.#router.navigate(path, {
            replace
        }).catch(() => { });
    }

    /**
     * Navigates back in the history.
     */
    override goBack(): void {
        this.#router.navigate(-1).catch(() => { });
    }

    /**
     * Navigates forward in the history.
     */
    override goForward(): void {
        this.#router.navigate(1).catch(() => { });
    }

    /**
     * Observable that emits navigation data on navigation changes.
     */
    override get onNavigationChange(): Observable<NavigationData> {
        return new Observable(subscriber => {
            this.#router.subscribe(() => {
                subscriber.next();
            });
        });
    }

    /**
     * Gets the current path.
     */
    override get currentPath(): string {
        return this.#router.state.location.pathname;
    }

    /**
     * Checks if a given path is active.
     * @param path - The path to check.
     * @returns True if the path is active, false otherwise.
     */
    override isPathActive(path: string): boolean {
        return this.#router.state.matches.some(m => m.route.path != null && (m.route.path === path || matchPath(m.route.path, path)));
    }

    /**
     * Updates the URL without reloading the page.
     * @param url - The new URL.
     * @param reload - Whether to reload the page.
     */
    override updateUrl(url: URL, reload?: boolean): void {
        window.history.replaceState(null, '', url.toString());
        if (reload === true) {
            window.location.reload();
        }
    }

    /**
     * Updates the search parameters in the URL without reloading the page.
     * @param params - The new search parameters.
     * @param reload - Whether to reload the page.
     */
    override updateSearchParams(params: URLSearchParams, reload?: boolean): void {
        const url = new URL(`?${params.toString()}`, window.location.href);
        window.history.replaceState(null, '', url);
        if (reload === true) {
            window.location.reload();
        }
    }
}

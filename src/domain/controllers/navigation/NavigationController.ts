import { matchPath, type Router } from '@remix-run/router';
import { type NavigationData, NavigationService } from 'foundation/core/system/navigation/NavigationService';
import { Observable } from 'rxjs';

const NOMINAL = Symbol('NavigationController');

export class NavigationController extends NavigationService {
    [NOMINAL]: symbol = NOMINAL;

    static readonly token: symbol = Symbol('NavigationController');

    #router: Router;

    constructor(router: Router) {
        super();
        this.#router = router;
    }

    override goTo(path: string, replace?: boolean): void {
        this.#router.navigate(path, {
            replace
        }).catch(() => { });
    }

    override goBack(): void {
        this.#router.navigate(-1).catch(() => { });
    }

    override goForward(): void {
        this.#router.navigate(1).catch(() => { });
    }

    override get onNavigationChange(): Observable<NavigationData> {
        return new Observable(subscriber => {
            this.#router.subscribe(() => {
                subscriber.next();
            });
        });
    }

    override get currentPath(): string {
        return this.#router.state.location.pathname;
    }

    override isPathActive(path: string): boolean {
        return this.#router.state.matches.some(m => m.route.path != null && (m.route.path === path || matchPath(m.route.path, path)));
    }
}

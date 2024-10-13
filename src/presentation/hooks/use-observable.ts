import { useEffect, useRef, useState } from 'react';
import { filter, type Observable } from 'rxjs';

/**
 * Custom hook for subscribing to an RxJS observable and managing its state.
 * @template T - The type of the observable value.
 * @param {Observable<T>} observable - The observable to subscribe to.
 * @param {T} initial - The initial state value.
 * @returns {T} The current state value.
 */
export const useObservable = <T>(
    observable: Observable<T>,
    initial: T
): T => {
    const [state, setState] = useState(initial);
    const obsValue = useRef(initial);

    useEffect(() => {
        const subscription = observable.pipe(filter(v => v !== obsValue.current)).subscribe({
            next: value => {
                obsValue.current = value;
                setState(value);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [observable]);

    return state;
};
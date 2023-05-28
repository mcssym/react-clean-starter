import { useEffect, useRef, useState } from 'react';
import { filter, type Observable } from 'rxjs';

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

import type { PartialPropertiesOf } from 'foundation/supports/types';
import { type Observable, Subject } from 'rxjs';

export type StateNotifierStateType<T> = T extends StateNotifier<infer U> ? U : never;

export type StateCreator<T> = (properties: PartialPropertiesOf<T>) => T;

export class StateNotifier<T = unknown> {
    #stateCreator: StateCreator<T>;
    #state: T;
    #subject: Subject<T>;

    constructor(stateCreator: StateCreator<T>) {
        this.#stateCreator = stateCreator;
        const initialState = stateCreator({});
        this.#state = initialState;
        this.#subject = new Subject();

        this.setState = this.setState.bind(this);
    }

    get state(): T {
        return this.#state;
    }

    get observable(): Observable<T> {
        return this.#subject.asObservable();
    }

    copyState(data: PartialPropertiesOf<T>): void {
        this.setState(this.#stateCreator({
            ...this.#state,
            ...data,
        }));
    }

    setState(state: T): void {
        this.#state = state;
        this.#subject.next(state);
    }

    get hasListeners(): boolean {
        return this.#subject.observed;
    }
}

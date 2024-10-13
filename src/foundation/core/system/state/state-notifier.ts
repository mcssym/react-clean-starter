import type { PartialPropertiesOf } from '@foundation/supports/types';
import { type Observable, Subject } from 'rxjs';

/**
 * The function that creates the state
 */
export type StateCreator<T> = (properties: PartialPropertiesOf<T>) => T;

/**
 * StateNotifier is a class that allows you to manage the state of a component.
 * 
 * @template T The type of the state.
 */
export class StateNotifier<T = unknown> {
    readonly #stateCreator: StateCreator<T>;
    #state: T;
    readonly #subject: Subject<T>;

    constructor(stateCreator: StateCreator<T>) {
        this.#stateCreator = stateCreator;
        const initialState = stateCreator({});
        this.#state = initialState;
        this.#subject = new Subject();

        this.setState = this.setState.bind(this);
        this.copyState = this.copyState.bind(this);
    }

    get state(): T {
        return this.#state;
    }

    get observable(): Observable<T> {
        return this.#subject.asObservable();
    }

    /**
     * Copy the current state with the given data.
     * 
     * @param data The data to copy.
     */
    copyState(data: PartialPropertiesOf<T>): void {
        this.setState(this.#stateCreator({
            ...this.#state,
            ...data,
        }));
    }

    /**
     * Set the new state.
     * 
     * This will replace the current state with the new state. 
     * If you want to update the state, use `copyState` instead.
     * @param state The new state.
     */
    setState(state: T): void {
        this.#state = state;
        this.#subject.next(state);
    }

    get hasListeners(): boolean {
        return this.#subject.observed;
    }
}

export type StateNotifierStateType<T> = T extends StateNotifier<infer U> ? U : never;

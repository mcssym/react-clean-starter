/* eslint-disable no-use-before-define */
import { type ViewModel } from '@foundation/core/system/state/view-model';
import { useSNHandlerContext } from 'presentation/hooks/state/use-state-notifier';
import React, { useId } from 'react';
import { StateNotifiersHandler } from './state-notifier.provider';

/**
 * Props for the ViewModelProvider component.
 * @template T - The type of the ViewModel.
 */
export interface ViewModelProviderProps<T> {
    /**
     * The token used to identify the ViewModel.
     */
    token: symbol;

    /**
     * Function to create the ViewModel instance.
     * @returns {T} The created ViewModel instance.
     */
    create: () => T;
}

/**
 * Props for the Provider component.
 * @template T - The type of the ViewModel.
 */
interface ProviderProps<T> extends ViewModelProviderProps<T> {
    /**
     * The token used to identify the ViewModel.
     */
    token: symbol;

    /**
     * Function to create the ViewModel instance.
     * @returns {T} The created ViewModel instance.
     */
    create: () => T;

    /**
     * The handler context for state notifiers.
     */
    handlerContext: StateNotifiersHandler;
}

/**
 * Provider component for managing the lifecycle of a ViewModel.
 * @template T - The type of the ViewModel.
 * @template U - The type of the state managed by the ViewModel.
 */
class Provider<T extends ViewModel<U>, U = T extends ViewModel<infer I> ? I : unknown> extends React.Component<ProviderProps<T> & { children?: React.ReactNode }> {
    private viewModel: T;

    /**
     * Constructor for the Provider component.
     * @param {ProviderProps<T> & { children?: React.ReactNode }} props - The props for the component.
     */
    constructor(props: ProviderProps<T> & { children?: React.ReactNode }) {
        super(props);
        this.viewModel = this.props.create();
        // Add early allowing the ViewModel to be used in the Function Component.
        this.props.handlerContext.addNotifier(this.props.token, this.viewModel);
    }

    /**
     * Lifecycle method called when the component is mounted.
     */
    override componentDidMount() {
        this.viewModel.onMount();

        // Add again here in case it was removed in componentWillUnmount but the component
        // is not re instantiated.
        this.props.handlerContext.addNotifier(this.props.token, this.viewModel);
    }

    /**
     * Lifecycle method called when the component is about to unmount.
     */
    override componentWillUnmount() {
        this.viewModel.onUnmount();
        this.props.handlerContext.removeNotifier(this.props.token);
    }

    /**
     * Renders the component.
     * @returns {JSX.Element} The rendered component.
     */
    override render() {
        return (
            <>{this.props.children}</>
        );
    }
}

/**
 * ViewModelProvider component for providing a ViewModel to its children.
 * @template T - The type of the ViewModel.
 * @template U - The type of the state managed by the ViewModel.
 * @param {React.PropsWithChildren<ViewModelProviderProps<T>>} props - The props for the component.
 * @returns {JSX.Element} The provider component.
 */
export const ViewModelProvider = <T extends ViewModel<U>, U = T extends ViewModel<infer I> ? I : unknown>({ create, token, children }: React.PropsWithChildren<ViewModelProviderProps<T>>): JSX.Element => {
    const viewId = useId();
    const handlerContext = useSNHandlerContext();

    return (
        <Provider key={viewId} handlerContext={handlerContext} create={create as any} token={token}>
            {children}
        </Provider>
    );
};
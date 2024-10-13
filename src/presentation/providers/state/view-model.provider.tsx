/* eslint-disable no-use-before-define */
import { type ViewModel } from '@foundation/core/system/state/view-model';
import { useSNHandlerContext } from 'presentation/hooks/state/use-state-notifier';
import React, { useEffect, useId, useState } from 'react';

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
 * Provider component for managing the lifecycle of a ViewModel.
 * @template T - The type of the ViewModel.
 * @template U - The type of the state managed by the ViewModel.
 * @param {React.PropsWithChildren<ViewModelProviderProps<T>>} props - The props for the component.
 * @returns {JSX.Element} The provider component.
 */
export function ViewModelProvider<T extends ViewModel<U>, U = T extends ViewModel<infer I> ? I : unknown>({
    create,
    token,
    children
}: React.PropsWithChildren<ViewModelProviderProps<T>>): JSX.Element {
    const viewId = useId();
    const handlerContext = useSNHandlerContext();
    const [viewModel] = useState(() => {
        const viewModel = create();
        handlerContext.addNotifier(token, viewModel);
        return viewModel;
    });

    useEffect(() => {
        viewModel.onMount();
        handlerContext.addNotifier(token, viewModel);
        return () => {
            viewModel.onUnmount();
            handlerContext.removeNotifier(token);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewId]);

    return <>{children}</>;
}
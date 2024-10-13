/* eslint-disable no-use-before-define */
import { type ViewModel } from '@foundation/core/system/state/view-model';
import { useSNHandlerContext } from 'presentation/hooks/state/use-state-notifier';
import React, { useEffect, useId, useState } from 'react';

export interface ViewModelProviderProps<T> {
    token: symbol;
    create: () => T;
}

export function ViewModelProvider<T extends ViewModel<U>, U = T extends ViewModel<infer I> ? I : unknown>({ create, token, children }: React.PropsWithChildren<ViewModelProviderProps<T>>): JSX.Element {
    const viewId = useId();
    const handlerContext = useSNHandlerContext();
    const [viewModel] = useState((() => {
        const viewModel = create();
        handlerContext.addNotifier(token, viewModel);
        return viewModel;
    })());

    useEffect(() => {
        viewModel.onMount();
        handlerContext.addNotifier(token, viewModel);
        return () => {
            viewModel.onUnmount();
            handlerContext.removeNotifier(token);
        }
    }, [viewId]);

    return (
        <>{children}</>
    );
}

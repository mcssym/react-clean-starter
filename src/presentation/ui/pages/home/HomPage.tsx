
import { ViewModelProvider } from 'presentation/providers/state/ViewModelProvider';
import React from 'react';
import { HomeView } from './HomeView';
import { HomeViewModel } from './HomeViewModel';
import { useInjection } from 'presentation/providers/ServiceContainerProvider';
import { CHAT_MEMBERS_USE_CASES_TOKEN, CHAT_USE_CASES_TOKEN, type IChatMemberUseCases, type IChatUseCases } from 'domain/use_cases/ChatUseCases';

export const HomePage: React.FC = (): JSX.Element => {
    const chatUseCases = useInjection<IChatUseCases>(CHAT_USE_CASES_TOKEN);
    const chatMembersUseCases = useInjection<IChatMemberUseCases>(CHAT_MEMBERS_USE_CASES_TOKEN);
    return (
        <ViewModelProvider token={HomeViewModel.token} create={() => {
            return new HomeViewModel(chatUseCases, chatMembersUseCases);
        }} >
            <HomeView />
        </ViewModelProvider>
    );
}

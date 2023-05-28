import { Button, Card, Input, List, ListItem, Typography } from '@material-tailwind/react';
import { type User } from 'domain/entities/User';
import { TranslationKeys } from 'foundation/core/system/translation/ITranslationProvider';
import { useVMSelector, useViewModel } from 'presentation/hooks/state/use-view-model';
import { useI18n } from 'presentation/hooks/use-i18n';
import React, { useCallback, useState } from 'react';
import { HomeViewModel } from './HomeViewModel';
import { type Message } from 'domain/entities/Message';
import moment from 'moment';

const HomeMembers: React.FC = (): JSX.Element => {
    const t = useI18n();
    const members = useVMSelector<User[], HomeViewModel>(HomeViewModel.token, state => state.members);
    return (
        <div className="h-full fixed md:relative w-4/5 md:w-4/12 md:border-r pr-4" >
            <div className="mb-2 p-4">
                <Typography variant="h3" color="blue-gray">
                    {t(TranslationKeys.members)}
                </Typography>
            </div>
            <List>
                {members.map(member => {
                    return (
                        <ListItem key={member.id}>
                            <div >
                                <Typography variant="h6" color="blue-gray">
                                    {member.name}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                    {member.username}
                                </Typography>
                            </div>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

const ListMessages: React.FC = (): JSX.Element => {
    const messages = useVMSelector<Message[], HomeViewModel>(HomeViewModel.token, state => state.messages);
    return (
        <div className="flex-1 overflow-y-auto flex gap-4 p-4 flex-col-reverse" >
            {messages.map(message => {
                return (
                    <Card key={message.id} color="blue" >
                        <div className="p-3" >
                            <Typography variant="h6" color="white">
                                {message.user.name}
                            </Typography>
                            <Typography variant="paragraph" color="white" className="font-normal">
                                {message.content}
                            </Typography>
                            <Typography variant="small" color="white" className="font-semibold text-right">
                                {moment(message.creationDate).fromNow()}
                            </Typography>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

const FormMessage: React.FC = (): JSX.Element => {
    const t = useI18n();
    const viewModel = useViewModel<HomeViewModel>(HomeViewModel.token);
    const [message, setMessage] = useState<string>('');

    const handleSubmitEvent = useCallback((e?: React.BaseSyntheticEvent): void => {
        e?.preventDefault();
        viewModel.handleSubmitMessage(message).then(() => {
            setMessage('');
        }).catch(() => { });
    }, [message]);

    return (
        <div className="flex-0 p-6" >
            <form onSubmit={handleSubmitEvent} >
                <div className="relative flex w-full">
                    <Input
                        type="text"
                        placeholder={t(TranslationKeys.message)}
                        className="pr-20"
                        containerProps={{
                            className: 'min-w-0',
                        }}
                        value={message}
                        onChange={e => { setMessage(e.target.value) }}
                    />
                    <Button
                        size="sm"
                        className="!absolute right-1 top-1 rounded"
                        type="submit"
                    >
                        {t(TranslationKeys.send)}
                    </Button>
                </div>
            </form>
        </div>
    );
}

const HomeMessages: React.FC = (): JSX.Element => {
    return (
        <div className="h-full w-full md:w-8/12" >
            <div className="flex flex-col h-full justify-end" >
                <ListMessages />
                <FormMessage />
            </div>
        </div>
    );
}

export const HomeView: React.FC = (): JSX.Element => {
    return (
        <div className="flex mx-4 h-screen items-center justify-center md:p-12" >
            <Card className="w-full max-w-4xl flex flex-row gap-4 h-full p-4">
                <HomeMembers />
                <HomeMessages />
            </Card>
        </div>
    );
}

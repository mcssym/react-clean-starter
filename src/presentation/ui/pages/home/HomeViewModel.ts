import { type Message } from 'domain/entities/Message';
import { type User } from 'domain/entities/User';
import { type IChatUseCases, type IChatMemberUseCases } from 'domain/use_cases/ChatUseCases';
import { ViewModel } from 'foundation/core/system/state/ViewModel';
import { type PartialPropertiesOf } from 'foundation/supports/types';
import { type Subscription } from 'rxjs';

export class HomeViewState {
    readonly members: User[];
    readonly messages: Message[];

    constructor(data: PartialPropertiesOf<HomeViewState>) {
        this.members = data.members ?? [];
        this.messages = data.messages ?? [];
    }
}

export class HomeViewModel extends ViewModel<HomeViewState> {
    static readonly token = Symbol('HomeViewModel');

    readonly #chatUseCases: IChatUseCases;
    readonly #membersUseCases: IChatMemberUseCases;

    #memberSubscription?: Subscription;
    #messagesSubscription?: Subscription;

    constructor(chatUseCases: IChatUseCases, membersUseCases: IChatMemberUseCases) {
        super(properties => new HomeViewState(properties));

        this.#chatUseCases = chatUseCases;
        this.#membersUseCases = membersUseCases;
    }

    override onMount(): void {
        void this.#membersUseCases.listMembers().then(users => { this.copyState({ members: users }); }).catch(() => { });
        void this.#chatUseCases.listMessages().then(messages => { this.copyState({ messages }); }).catch(() => { });

        this.#memberSubscription = this.#membersUseCases.onNewMember().subscribe({
            next: user => {
                this.copyState({
                    members: [...this.state.members, user]
                });
            }
        });

        this.#messagesSubscription = this.#chatUseCases.listenToMessage().subscribe({
            next: message => {
                this.copyState({
                    messages: [message, ...this.state.messages]
                });
            }
        });
    }

    override onUnmount(): void {
        this.#memberSubscription?.unsubscribe();
        this.#messagesSubscription?.unsubscribe();
    }

    async handleSubmitMessage(content: string): Promise<void> {
        try {
            await this.#chatUseCases.sendMessage({
                message: content
            });
        } catch (error) {
            //
        }
    }
}

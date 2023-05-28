import { type IChatGateway } from 'data/resources/remote/ws/gateways/ChatGateway';
import { Message } from 'domain/entities/Message';
import { map, type Observable } from 'rxjs';
import { type IMemberProvider } from './contracts/MemberProvider';
import { User } from 'domain/entities/User';
import { type IMessageEndpoint } from 'data/resources/remote/http/endpoints/MessageEndpoint';
import { SaveDTO } from 'data/resources/remote/http/dto/messages/SaveDTO';

export const CHAT_USE_CASES_TOKEN = Symbol('CHAT_USE_CASES_TOKEN');
export const CHAT_MEMBERS_USE_CASES_TOKEN = Symbol('CHAT_MEMBERS_USE_CASES_TOKEN');

export interface SendMessageData {
    message: string;
}

export interface IChatUseCases {
    sendMessage: (data: SendMessageData) => Promise<void>;
    listMessages: () => Promise<Message[]>;
    listenToMessage: () => Observable<Message>;
}

export interface IChatMemberUseCases {
    listMembers: () => Promise<User[]>;
    onNewMember: () => Observable<User>;
}

const NOMINAL = Symbol('NOMINAL(ChatUseCases)');
export class ChatUseCases implements IChatUseCases, IChatMemberUseCases {
    static readonly token: symbol = Symbol('ChatUseCases');

    [NOMINAL]: symbol = NOMINAL;

    readonly #messageEndpoint: IMessageEndpoint;
    readonly #chatGateway: IChatGateway;
    readonly #memberProvider: IMemberProvider;

    constructor(chatGateway: IChatGateway, memberProvider: IMemberProvider, messageEndpoint: IMessageEndpoint) {
        this.#chatGateway = chatGateway;
        this.#memberProvider = memberProvider;
        this.#messageEndpoint = messageEndpoint;
    }

    async listMembers(): Promise<User[]> {
        return this.#memberProvider.members();
    }

    onNewMember(): Observable<User> {
        return this.#memberProvider.onNewUser();
    }

    async listMessages(): Promise<Message[]> {
        const results = await this.#messageEndpoint.readAll();
        const users = this.#memberProvider.members();
        return results.map(message => {
            const user = users.find(u => u.id === message.userId);
            return new Message(message.id, message.content, new User({
                id: message.userId,
                name: user?.name ?? 'Unknown',
                username: user?.username ?? 'Unknown'
            }), message.createdAt);
        });
    }

    async sendMessage(data: SendMessageData): Promise<void> {
        await this.#messageEndpoint.save(new SaveDTO({
            content: data.message
        }));
    }

    listenToMessage(): Observable<Message> {
        return this.#chatGateway.onMessage().pipe(map(message => {
            const user = this.#memberProvider.members().find(u => u.id === message.userId);
            return new Message(message.id, message.content, new User({
                id: message.userId,
                name: user?.name ?? 'Unknown',
                username: user?.username ?? 'Unknown'
            }), message.createdAt);
        }));
    }
}

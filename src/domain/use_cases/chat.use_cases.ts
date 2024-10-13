import { UserModel } from "@data/resources/remote/http/models/user.model";
import type { IChatGateway } from "@data/resources/remote/ws/gateways/chat.gateway";
import { Message } from "@domain/entities/message.entity";
import { uniqueId } from "@foundation/supports/helpers";
import { type Observable, map } from "rxjs";


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
    listMembers: () => Promise<UserModel[]>;
    onNewMember: () => Observable<UserModel>;
}

const NOMINAL = Symbol('NOMINAL(ChatUseCases)');
export class ChatUseCases implements IChatUseCases, IChatMemberUseCases {
    static readonly token: symbol = Symbol('ChatUseCases');

    [NOMINAL]: symbol = NOMINAL;

    //readonly #messageEndpoint: IMessageEndpoint;
    readonly #chatGateway: IChatGateway;
    // readonly #memberProvider: IMemberProvider;

    constructor(chatGateway: IChatGateway) {
        this.#chatGateway = chatGateway;
        // this.#memberProvider = memberProvider;
        //this.#messageEndpoint = messageEndpoint;
    }

    async listMembers(): Promise<UserModel[]> {
        // return this.#memberProvider.members();

        return [];
    }

    onNewMember(): Observable<UserModel> {
        //return this.#memberProvider.onNewUser();
        throw new Error('Method not implemented.');
    }

    async listMessages(): Promise<Message[]> {
        // const results = await this.#messageEndpoint.readAll();
        // const users = this.#memberProvider.members();
        // return results.map(message => {
        //     const user = users.find(u => u.id === message.userId);
        //     return new Message(message.id, message.content, new User({
        //         id: message.userId,
        //         name: user?.name ?? 'Unknown',
        //         username: user?.username ?? 'Unknown'
        //     }), message.createdAt);
        // });
        return [];
    }

    async sendMessage(_: SendMessageData): Promise<void> {
        // await this.#messageEndpoint.save(new SaveDTO({
        //     content: data.message
        // }));
    }

    listenToMessage(): Observable<Message> {
        return this.#chatGateway.onMessage().pipe(map(message => {
            // const user = this.#memberProvider.members().find(u => u.id === message.userId);
            return new Message(message.id, message.content, new UserModel({
                id: message.userId,
                uuid: uniqueId(message.userId),
                name: '',
            }), message.createdAt);
        }));
    }
}
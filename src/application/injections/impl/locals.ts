import { type SaveDTO } from 'data/resources/remote/http/dto/messages/SaveDTO';
import { type IMessageEndpoint } from 'data/resources/remote/http/endpoints/MessageEndpoint';
import { MessageModel } from 'data/resources/remote/http/models/MessageModel';
import { type IChatGateway } from 'data/resources/remote/ws/gateways/ChatGateway';
import { User } from 'domain/entities/User';
import { type AuthManager } from 'domain/managers/AuthManager';
import { type IMemberProvider } from 'domain/use_cases/contracts/MemberProvider';
import { uniqueId } from 'foundation/supports/helpers';
import { Subject, type Observable } from 'rxjs';

const MESSAGE_PREFIX = 'message--';

export class LocalChat implements IChatGateway, IMessageEndpoint {
    static readonly token = Symbol('LocalChat');

    readonly #subject: Subject<MessageModel>;
    #messages: MessageModel[];

    readonly #authManager: AuthManager;

    constructor(authManager: AuthManager) {
        this.#authManager = authManager;
        this.#subject = new Subject();
        this.#messages = [];
        window.addEventListener('storage', event => {
            if (event.key?.startsWith(MESSAGE_PREFIX) === true) {
                if (event.newValue != null) {
                    const message = MessageModel.fromJson(event.newValue);
                    this.#messages.push(message);
                    this.#subject.next(message);
                }
            }
        });
    }

    async save(dto: SaveDTO): Promise<void> {
        if (this.#authManager.state.user != null) {
            const message = new MessageModel({
                content: dto.content,
                createdAt: new Date(),
                id: uniqueId('message--'),
                userId: this.#authManager.state.user?.id
            });
            this.#messages.push(message);
            this.#subject.next(message);
            localStorage.setItem(message.id, JSON.stringify(message.toJson()));
        }
    }

    async readAll(): Promise<MessageModel[]> {
        const len = localStorage.length;
        this.#messages = [];
        for (let index = 0; index < len; index++) {
            const key = localStorage.key(index);
            if (key?.startsWith(MESSAGE_PREFIX) === true) {
                const data = localStorage.getItem(key);
                if (data != null) {
                    const message = MessageModel.fromJson(data);
                    this.#messages.push(message);
                }
            }
        }
        return this.#messages;
    }

    onMessage(): Observable<MessageModel> {
        return this.#subject.asObservable();
    }
}

const USERS_KEY = '__users';

export class LocalMemberProvider implements IMemberProvider {
    static readonly token = Symbol('LocalMemberProvider');

    readonly #subject: Subject<User>;
    #users: User[];

    constructor() {
        this.#users = [];
        this.#subject = new Subject();
        window.addEventListener('storage', event => {
            if (event.key === USERS_KEY) {
                this.members();
                const user = this.#users.at(-1);
                if (user != null) {
                    this.#subject.next(user);
                }
            }
        });
    }

    initialize(): void {
        this.members();
    }

    addMember(user: User): void {
        this.#users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(this.#users.map(u => u.toMap())))
    }

    removeMember(user: User): void {
        this.#users = this.#users.filter(u => u.id === user.id);
    }

    members(): User[] {
        const data = localStorage.getItem(USERS_KEY);
        this.#users = [];
        if (data != null) {
            const jsonArray = JSON.parse(data);
            if (Array.isArray(jsonArray) && jsonArray.length > 0) {
                this.#users = jsonArray.map(json => new User(json));
            }
        }
        return this.#users;
    }

    onNewUser(): Observable<User> {
        return this.#subject.asObservable();
    }
}

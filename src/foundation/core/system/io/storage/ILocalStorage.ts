import { type Nullable } from 'foundation/supports/types';

export const LOCAL_STORAGE_TOKEN = Symbol('LOCAL_STORAGE_TOKEN');

export interface ILocalStorage {
    get: (key: string) => Promise<Nullable<string>>;
    set: (key: string, value: string) => Promise<void>;
    remove: (key: string) => Promise<void>;
}

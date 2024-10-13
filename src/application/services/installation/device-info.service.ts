import { detect } from 'detect-browser';

const NOMINAL = Symbol('DeviceInfoService');

export class DeviceInfoService {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('DeviceInfoService');

    #deviceName = "web";
    #deviceVersion = "0.0.0";

    async initialize(): Promise<void> {
        const browser = detect();
        this.#deviceVersion = browser?.version ?? this.#deviceVersion;
        this.#deviceName = ['web', browser?.os, browser?.name].filter(Boolean).join('__');
    }

    get deviceName(): string {
        return this.#deviceName;
    }

    get deviceVersion(): string {
        return this.#deviceVersion;
    }
}
import { detect } from 'detect-browser';

const NOMINAL = Symbol('DeviceInfoService');

/**
 * Service responsible for providing device information.
 */
export class DeviceInfoService {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('DeviceInfoService');

    #deviceName = "web";
    #deviceVersion = "0.0.0";

    /**
     * Initializes the device information service
     * by detecting the browser. 
     * @returns {Promise<void>} A promise that resolves when the service is initialized.
     * @async
     */
    async initialize(): Promise<void> {
        const browser = detect();
        this.#deviceVersion = browser?.version ?? this.#deviceVersion;
        this.#deviceName = ['web', browser?.os, browser?.name].filter(Boolean).join('__');
    }

    /**
     * Getter for the device name.
     * 
     * @returns {string} The device name.
     * @readonly
     * @public
     */
    get deviceName(): string {
        return this.#deviceName;
    }

    /**
     * Getter for the device version.
     * 
     * @returns {string} The device version.
     * @readonly
     * @public
     */
    get deviceVersion(): string {
        return this.#deviceVersion;
    }
}
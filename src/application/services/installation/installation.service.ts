import type { IInstallationEndpoint } from "@data/resources/remote/http/endpoints/installations.endpoint";
import type { AppStoragesService } from "../io/storage/app-storages.services";
import { CreateInstallationDto } from "@data/resources/remote/http/dto/installations/create-installation.dto";
import { AC_APP_NAME_KEY, type Config } from "@foundation/core/config";
import type { DeviceInfoService } from "./device-info.service";
import type { IAxiosInstanceProvider } from "../io/http/axios-http-client";

const NOMINAL = Symbol('InstallationService');

const installationKey = "X-APP-INSTALLATION-ID";

/**
 * Service responsible for managing the installation.
 */
export class InstallationService {
    [NOMINAL]: symbol = NOMINAL;
    static readonly token: symbol = Symbol('InstallationService');

    #installationUuid: string | null = null;

    private readonly installationEndpoint: IInstallationEndpoint;
    private readonly axiosInstanceProvider: IAxiosInstanceProvider;
    private readonly storages: AppStoragesService;
    private readonly config: Config;
    private readonly deviceInfo: DeviceInfoService;

    constructor({
        installationEndpoint,
        axiosInstanceProvider,
        storages,
        config,
        deviceInfo
    }: {
        installationEndpoint: IInstallationEndpoint,
        axiosInstanceProvider: IAxiosInstanceProvider,
        storages: AppStoragesService,
        config: Config,
        deviceInfo: DeviceInfoService
    }) {
        this.installationEndpoint = installationEndpoint;
        this.axiosInstanceProvider = axiosInstanceProvider;
        this.storages = storages;
        this.config = config;
        this.deviceInfo = deviceInfo;
    }

    /**
     * Initializes the installation service.
     * 
     * @returns {Promise<void>} A promise that resolves when the service is initialized.
     * @async
     * @public
     */
    async initialize(): Promise<void> {
        try {
            this.#installationUuid = await this.storages.get(installationKey);
        } catch (_) {
            //
        } finally {
            if (this.#installationUuid == null) {
                await this.#createInstallation();
            }
        }
        this.#setAxiosInterceptor();
    }

    async #createInstallation(): Promise<void> {
        try {
            const dto = new CreateInstallationDto({
                appVersion: this.config.get(AC_APP_NAME_KEY, "1.0.0-unknown"),
                deviceOs: this.deviceInfo.deviceName,
                deviceOsVersion: this.deviceInfo.deviceVersion,
            });

            const response = await this.installationEndpoint.create(dto);
            this.#installationUuid = response.data.uuid;
            await this.storages.set(installationKey, this.#installationUuid);
        } catch (_) {
            //
        }
    }

    #setAxiosInterceptor(): void {
        this.axiosInstanceProvider.axios.interceptors.request.use(config => {
            if (this.#installationUuid != null) {
                config.headers[installationKey] = this.#installationUuid;
            }
            return config;
        });
    }
}
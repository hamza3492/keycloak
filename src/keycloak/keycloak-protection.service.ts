// import { KeycloakConfigService } from '@mevris/server-common';
import { KeycloakConfigService } from './keycloak-config.service';
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Dictionary } from 'lodash';
import * as qs from 'qs';
// import KeycloakService from './keycloak.service'

export interface KeycloakProtectionQueryParams extends Dictionary<any> {
    name?: string;
    uri?: string;
    owner?: any;
    _id?: string;
    type?: string;
    scope?: string;
}

@Injectable()
export class KeycloakProtectionService {

    private logger: Logger = new Logger(this.constructor.name);
    // private refreshToken = this.getRefreshToken();   

    constructor(
        private readonly configs: KeycloakConfigService,
        private readonly httpService: HttpService,
        // private readonly keycloakService: KeycloakService
    ) { }

    public async createResource(data: any): Promise<any> {
        try {
            console.log(data, "DATA")
            const pat = await this.getProtectionApiToken();
            // const refresh_token = await this.getRefreshToken()
            const url = await this.getBaseUrl();
            // console.log(data)

            const result = this.httpService
                .post(url, data, {
                    headers: {
                        'Authorization': `Bearer ${pat.pat}`,
                        'Content-Type': 'application/json',
                    }
                }).toPromise()
            // console.log(result)
            return result
        }
        catch (err) {
            console.error(err);
        }
    }

    public async updateResource(resourceId: string, data: any): Promise<any> {
        try {
            console.log(resourceId, data, "UPDATE")
            const pat = await this.getProtectionApiToken();
            const url = await this.getBaseUrl();

            await this.httpService
                .put(`${url}/${resourceId}`, data, {
                    headers: {
                        'Authorization': `Bearer ${pat.pat}`,
                        'Content-Type': 'application/json',
                    }
                })
                .toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    public async deleteResource(resourceId: string): Promise<any> {
        try {
            const pat = await this.getProtectionApiToken();
            const url = await this.getBaseUrl();

            await this.httpService
                .delete(`${url}/${resourceId}`, {
                    headers: {
                        'Authorization': `Bearer ${pat.pat}`,
                    }
                })
                .toPromise();
        } catch (error) {
            console.log(error.message);
        }
    }

    public async getOne(resourceId: string): Promise<any> {
        try {
            const pat = await this.getProtectionApiToken();
            const url = await this.getBaseUrl();

            const result = await this.httpService
                .get(`${url}/${resourceId}`, {
                    headers: {
                        'Authorization': `Bearer ${pat.pat}`,
                        'Content-Type': 'application/json',
                    }
                })
                .toPromise();

            return result.data;
        } catch (err) {
            console.log(err.message);
        }
    }

    public async getAllResources(owner: string): Promise<any> {
        try {
            console.log(owner)
            const pat = await this.getProtectionApiToken();
            const url = await this.getBaseUrl();

            const result = this.httpService
                .get(`${url}?owner=${owner}`, {
                    headers: {
                        'Authorization': `Bearer ${pat.pat}`,
                        'Content-Type': 'application/json',
                    }
                })
                .toPromise();

            // console.log(result);
            return (await result).data
        } catch (err) {
            console.log(err.message);
        }
    }


    public async query(params: KeycloakProtectionQueryParams): Promise<any> {
        const pat = await this.getRefreshToken();
        const url = await this.getBaseUrl();

        const result = await this.httpService
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${pat}`,
                    'Content-Type': 'application/json',
                },
                params
            })
            .toPromise();

        return result.data;
    }

    public async getRefreshToken() {
        try {
            const pat = await this.getProtectionApiToken();
            const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/protocol/openid-connect/token'

            const result = await this.httpService.post(url, qs.stringify({
                grant_type: 'refresh_token',
                client_id: 'keycloak-testing',
                client_secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN',
                refresh_token: `${pat.prt}`
            }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .toPromise()

            const token = result.data['access_token']
            // console.log(token, "Token")
            // response.send(result.data['refresh_token'])
            return token
        } catch (err) {
            console.log(err)
        }
    }

    private async getProtectionApiToken() {
        // const url = await this.getBaseUrl();
        const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/protocol/openid-connect/token';
        const configs = await this.configs.createKeycloakConnectOptions();

        try {
            const result = await this.httpService
                .post(url, qs.stringify({
                    grant_type: 'client_credentials',
                    client_id: 'keycloak-testing',
                    client_secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN',
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .toPromise();

            const pat = result.data['access_token'];
            const prt = result.data['refresh_token'];

            // console.log(result.data['refresh_token'], 'REfresh token')
            return { pat, prt };
        } catch (error) {
            console.log(error, 'error');
        }
    }

    private async getBaseUrl() {
        const configs = await this.configs.createKeycloakConnectOptions();
        // const url = `${configs['auth-server-url']}/auth/realms/${configs.realm}/authz/protection/resource_set`;
        const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/authz/protection/resource_set'
        // const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/protocol/openid-connect/token'

        return url;
    }
}
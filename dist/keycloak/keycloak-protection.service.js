"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakProtectionService = void 0;
const keycloak_config_service_1 = require("./keycloak-config.service");
const common_1 = require("@nestjs/common");
const qs = require("qs");
let KeycloakProtectionService = class KeycloakProtectionService {
    constructor(configs, httpService) {
        this.configs = configs;
        this.httpService = httpService;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async createResource(data) {
        try {
            console.log(data, "DATA");
            const pat = await this.getProtectionApiToken();
            const url = await this.getBaseUrl();
            const result = this.httpService
                .post(url, data, {
                headers: {
                    'Authorization': `Bearer ${pat.pat}`,
                    'Content-Type': 'application/json',
                }
            }).toPromise();
            return result;
        }
        catch (err) {
            console.error(err);
        }
    }
    async updateResource(resourceId, data) {
        try {
            console.log(resourceId, data, "UPDATE");
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
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async deleteResource(resourceId) {
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
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async getOne(resourceId) {
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
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async getAllResources(owner) {
        try {
            console.log(owner);
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
            return (await result).data;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async query(params) {
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
    async getRefreshToken() {
        try {
            const pat = await this.getProtectionApiToken();
            const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/protocol/openid-connect/token';
            const result = await this.httpService.post(url, qs.stringify({
                grant_type: 'refresh_token',
                client_id: 'keycloak-testing',
                client_secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN',
                refresh_token: `${pat.prt}`
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .toPromise();
            const token = result.data['access_token'];
            return token;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getProtectionApiToken() {
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
            return { pat, prt };
        }
        catch (error) {
            console.log(error, 'error');
        }
    }
    async getBaseUrl() {
        const configs = await this.configs.createKeycloakConnectOptions();
        const url = 'https://accounts.mevris.app/auth/realms/keycloak-testing/authz/protection/resource_set';
        return url;
    }
};
KeycloakProtectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [keycloak_config_service_1.KeycloakConfigService,
        common_1.HttpService])
], KeycloakProtectionService);
exports.KeycloakProtectionService = KeycloakProtectionService;
//# sourceMappingURL=keycloak-protection.service.js.map
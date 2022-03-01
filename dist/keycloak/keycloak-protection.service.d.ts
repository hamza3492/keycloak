import { KeycloakConfigService } from './keycloak-config.service';
import { HttpService } from '@nestjs/common';
import { Dictionary } from 'lodash';
export interface KeycloakProtectionQueryParams extends Dictionary<any> {
    name?: string;
    uri?: string;
    owner?: any;
    _id?: string;
    type?: string;
    scope?: string;
}
export declare class KeycloakProtectionService {
    private readonly configs;
    private readonly httpService;
    private logger;
    constructor(configs: KeycloakConfigService, httpService: HttpService);
    createResource(data: any): Promise<any>;
    updateResource(resourceId: string, data: any): Promise<any>;
    deleteResource(resourceId: string): Promise<any>;
    getOne(resourceId: string): Promise<any>;
    getAllResources(owner: string): Promise<any>;
    query(params: KeycloakProtectionQueryParams): Promise<any>;
    getRefreshToken(): Promise<any>;
    private getProtectionApiToken;
    private getBaseUrl;
}

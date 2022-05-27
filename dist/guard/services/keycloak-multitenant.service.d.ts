import KeycloakConnect from 'keycloak-connect';
import { KeycloakConnectOptions } from '../interface/keycloak-connect-options.interface';
export declare class KeycloakMultiTenantService {
    private keycloakOpts;
    private instances;
    constructor(keycloakOpts: KeycloakConnectOptions);
    clear(): void;
    get(realm: string): KeycloakConnect.Keycloak;
}

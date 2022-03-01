import { KeycloakConnectConfig, KeycloakConnectOptionsFactory } from 'nest-keycloak-connect';
export declare class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    createKeycloakConnectOptions(): KeycloakConnectConfig | Promise<KeycloakConnectConfig>;
}

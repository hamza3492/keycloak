

// import { ConsulConfig, InjectConfig } from '@nestcloud/config';
import { Injectable } from '@nestjs/common';
import { KeycloakConnectConfig, KeycloakConnectOptionsFactory, PolicyEnforcementMode } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    // constructor() { }

    createKeycloakConnectOptions(): KeycloakConnectConfig | Promise<KeycloakConnectConfig> {

        return {
            authServerUrl: 'https://accounts.mevris.app/auth',
            realm: 'keycloak-testing',
            clientId: 'keycloak-testing',
            secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN',
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            logLevels: ['warn'],
            useNestLogger: false,
        };
    }
}   
import { LogLevel } from '@nestjs/common';
import { PolicyEnforcementMode, TokenValidation } from '../constants';
export declare type KeycloakConnectOptions = string | KeycloakConnectConfig;
export interface MultiTenantOptions {
    realmResolver: (request: any) => string;
    realmSecretResolver?: (realm: string) => string;
}
export interface NestKeycloakConfig {
    cookieKey?: string;
    logLevels?: LogLevel[];
    useNestLogger?: boolean;
    policyEnforcement?: PolicyEnforcementMode;
    tokenValidation?: TokenValidation;
    multiTenant?: MultiTenantOptions;
}
export interface KeycloakConnectConfig extends NestKeycloakConfig {
    realm?: string;
    resource?: string;
    'client-id'?: string;
    clientId?: string;
    credentials?: KeycloakCredentials;
    secret: string;
    'public-client'?: boolean;
    public?: boolean;
    'auth-server-url'?: string;
    'server-url'?: string;
    serverUrl?: string;
    authServerUrl?: string;
    'min-time-between-jwks-requests'?: number;
    minTimeBetweenJwksRequests?: number;
    'bearer-only'?: boolean;
    bearerOnly?: boolean;
    'realm-public-key'?: string;
    realmPublicKey?: string;
    'verify-token-audience'?: boolean;
    verifyTokenAudience?: boolean;
    'confidential-port'?: string | number;
    'ssl-required'?: string;
}
export interface KeycloakCredentials {
    secret: string;
}

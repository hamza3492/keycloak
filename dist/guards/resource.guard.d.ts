import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as KeycloakConnect from 'keycloak-connect';
import { KeycloakConnectConfig } from '../interface/keycloak-connect-options.interface';
import { KeycloakMultiTenantService } from '../services/keycloak-multitenant.service';
export declare class ResourceGuard implements CanActivate {
    private singleTenant;
    private keycloakOpts;
    private logger;
    private multiTenant;
    private readonly reflector;
    constructor(singleTenant: KeycloakConnect.Keycloak, keycloakOpts: KeycloakConnectConfig, logger: Logger, multiTenant: KeycloakMultiTenantService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

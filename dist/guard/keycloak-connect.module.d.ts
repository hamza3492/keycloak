import { DynamicModule, Logger } from '@nestjs/common';
import { KeycloakConnectModuleAsyncOptions } from './interface/keycloak-connect-module-async-options.interface';
import { KeycloakConnectOptions, NestKeycloakConfig } from './interface/keycloak-connect-options.interface';
export * from './constants';
export * from './decorators/authenticated-user.decorator';
export * from './decorators/enforcer-options.decorator';
export * from './decorators/public.decorator';
export * from './decorators/resource.decorator';
export * from './decorators/roles.decorator';
export * from './decorators/scopes.decorator';
export * from './guards/auth.guard';
export * from './guards/resource.guard';
export * from './guards/role.guard';
export * from './interface/keycloak-connect-module-async-options.interface';
export * from './interface/keycloak-connect-options-factory.interface';
export * from './interface/keycloak-connect-options.interface';
export declare class KeycloakConnectModule {
    static logger: Logger;
    static register(opts: KeycloakConnectOptions, config?: NestKeycloakConfig): DynamicModule;
    static registerAsync(opts: KeycloakConnectModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}

import { DynamicModule } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak-config.service';
export declare class KeycloakModule {
    static register(options: KeycloakConfigService): DynamicModule;
    static registerAsync(options: KeycloakConfigService): DynamicModule;
}

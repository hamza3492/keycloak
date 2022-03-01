import { DynamicModule, Module, ModuleMetadata, Type, HttpService, HttpModule } from '@nestjs/common';
// import { ElasticsearchModule, ElasticsearchModuleOptions } from '@nestjs/elasticsearch';
import { KeycloakConfigService } from './keycloak-config.service';

import { KeycloakProtectionService } from './keycloak-protection.service';
import { KeycloakController } from './keycloak.controller';
// import { KeycloakService } from './keycloak.service';

// export interface KeycloakModuleOptions extends ElasticsearchModuleOptions { }

// export interface KeycloakOptionsFactory {
//   createElasticsearchOptions(): Promise<KeycloakModuleOptions> | KeycloakModuleOptions;
// }

// export interface KeycloakModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
//   useExisting?: Type<KeycloakOptionsFactory>;
//   useClass?: Type<KeycloakOptionsFactory>;
//   useFactory?: (...args: any[]) => Promise<KeycloakModuleOptions> | KeycloakModuleOptions;
//   inject?: any[];
// }

@Module({
  imports: [HttpModule],
  providers: [
    // KeycloakService,
    KeycloakProtectionService,
    KeycloakConfigService,
    // HttpService,
  ],
  exports: [
    KeycloakProtectionService,
    // HttpService,

  ],
  controllers: [KeycloakController]
})
export class KeycloakModule {
  static register(options: KeycloakConfigService): DynamicModule {
    return {
      module: KeycloakModule,
      imports: [
        KeycloakModule.register(options),
      ],
    };
  }

  static registerAsync(options: KeycloakConfigService): DynamicModule {
    return {
      module: KeycloakModule,
      imports: [
        KeycloakModule.registerAsync(options),
        // ...options.imports || [],
      ],
    };
  }
}
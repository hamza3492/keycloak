import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { KeycloakConnectModule, ResourceGuard, AuthGuard, RoleGuard, TokenValidation, PolicyEnforcementMode } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakModule } from './keycloak/keycloak.module';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'https://accounts.mevris.app/auth',
      realm: 'keycloak-testing',
      clientId: 'keycloak-testing',
      secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN', // Secret key of the client taken from keycloak server
      logLevels: ['verbose']
      // policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      // tokenValidation: TokenValidation.ONLINE
    }),
    PostsModule,
    KeycloakModule,
    DatabaseModule,
    BlogsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
})
export class AppModule { }

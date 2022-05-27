import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import {
  KeycloakConnectModule,
  // ResourceGuard,
  //  AuthGuard, RoleGuard, 
  // TokenValidation, PolicyEnforcementMode
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakModule } from './keycloak/keycloak.module';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './blogs/blogs.module';
// import { SentryModule } from '@ntegral/nestjs-sentry';
// import LogLevel from '@sentry/types'
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AppService } from './app.service';
import { AuthGuard } from './../guard/guards/auth.guard';
import { ResourceGuard } from './../guard/guards/resource.guard';
import { RoleGuard } from './../guard/guards/role.guard';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'https://accounts.mevris.app/auth',
      realm: 'keycloak-testing',
      clientId: 'keycloak-testing',
      secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN', // Secret key of the client taken from keycloak server
      logLevels: ['verbose'],
      // PolicyEnforcementMode: PolicyEnforcementMode.PERMISSIVE,
      // tokenValidation: TokenValidation.ONLINE
    }),
    // SentryModule.forRoot({
    //   debug: true,
    //   dsn:
    //     'https://a7f6793219124fef9b995fa16a2d9140@o1156909.ingest.sentry.io/6238672',
    //   logLevel: LogLevel.Severity.Debug,
    //   environment: 'development',
    //   tracesSampleRate: 1.0,
    // }),
    PostsModule,
    KeycloakModule,
    DatabaseModule,
    BlogsModule,
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
    },
    // AppService
  ],
})
export class AppModule { }

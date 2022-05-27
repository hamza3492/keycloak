"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const posts_module_1 = require("./posts/posts.module");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const core_1 = require("@nestjs/core");
const keycloak_module_1 = require("./keycloak/keycloak.module");
const database_module_1 = require("./database/database.module");
const blogs_module_1 = require("./blogs/blogs.module");
const auth_guard_1 = require("./../guard/guards/auth.guard");
const resource_guard_1 = require("./../guard/guards/resource.guard");
const role_guard_1 = require("./../guard/guards/role.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: 'https://accounts.mevris.app/auth',
                realm: 'keycloak-testing',
                clientId: 'keycloak-testing',
                secret: 'udRXpHUBO1krIWcvd4p6wboKcwOXcOmN',
                logLevels: ['verbose'],
            }),
            posts_module_1.PostsModule,
            keycloak_module_1.KeycloakModule,
            database_module_1.DatabaseModule,
            blogs_module_1.BlogsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: resource_guard_1.ResourceGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RoleGuard
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
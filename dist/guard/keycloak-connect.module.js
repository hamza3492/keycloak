"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var KeycloakConnectModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakConnectModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const keycloak_connect_providers_1 = require("./keycloak-connect.providers");
const keycloak_multitenant_service_1 = require("./services/keycloak-multitenant.service");
__exportStar(require("./constants"), exports);
__exportStar(require("./decorators/authenticated-user.decorator"), exports);
__exportStar(require("./decorators/enforcer-options.decorator"), exports);
__exportStar(require("./decorators/public.decorator"), exports);
__exportStar(require("./decorators/resource.decorator"), exports);
__exportStar(require("./decorators/roles.decorator"), exports);
__exportStar(require("./decorators/scopes.decorator"), exports);
__exportStar(require("./guards/auth.guard"), exports);
__exportStar(require("./guards/resource.guard"), exports);
__exportStar(require("./guards/role.guard"), exports);
__exportStar(require("./interface/keycloak-connect-module-async-options.interface"), exports);
__exportStar(require("./interface/keycloak-connect-options-factory.interface"), exports);
__exportStar(require("./interface/keycloak-connect-options.interface"), exports);
let KeycloakConnectModule = KeycloakConnectModule_1 = class KeycloakConnectModule {
    static register(opts, config) {
        const keycloakConnectProviders = [
            (0, keycloak_connect_providers_1.createKeycloakConnectOptionProvider)(opts, config),
            keycloak_connect_providers_1.loggerProvider,
            keycloak_connect_providers_1.keycloakProvider,
            keycloak_multitenant_service_1.KeycloakMultiTenantService,
        ];
        return {
            module: KeycloakConnectModule_1,
            providers: keycloakConnectProviders,
            exports: keycloakConnectProviders,
        };
    }
    static registerAsync(opts) {
        const optsProvider = this.createAsyncProviders(opts);
        return {
            module: KeycloakConnectModule_1,
            imports: opts.imports || [],
            providers: optsProvider,
            exports: optsProvider,
        };
    }
    static createAsyncProviders(options) {
        const reqProviders = [
            this.createAsyncOptionsProvider(options),
            keycloak_connect_providers_1.loggerProvider,
            keycloak_connect_providers_1.keycloakProvider,
            keycloak_multitenant_service_1.KeycloakMultiTenantService,
        ];
        if (options.useExisting || options.useFactory) {
            return reqProviders;
        }
        return [
            ...reqProviders,
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.KEYCLOAK_CONNECT_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.KEYCLOAK_CONNECT_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createKeycloakConnectOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
};
KeycloakConnectModule.logger = new common_1.Logger(KeycloakConnectModule_1.name);
KeycloakConnectModule = KeycloakConnectModule_1 = __decorate([
    (0, common_1.Module)({})
], KeycloakConnectModule);
exports.KeycloakConnectModule = KeycloakConnectModule;
//# sourceMappingURL=keycloak-connect.module.js.map
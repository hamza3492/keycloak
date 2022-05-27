"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeycloakModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakModule = void 0;
const common_1 = require("@nestjs/common");
const keycloak_config_service_1 = require("./keycloak-config.service");
const keycloak_protection_service_1 = require("./keycloak-protection.service");
const keycloak_controller_1 = require("./keycloak.controller");
let KeycloakModule = KeycloakModule_1 = class KeycloakModule {
    static register(options) {
        return {
            module: KeycloakModule_1,
            imports: [
                KeycloakModule_1.register(options),
            ],
        };
    }
    static registerAsync(options) {
        return {
            module: KeycloakModule_1,
            imports: [
                KeycloakModule_1.registerAsync(options),
            ],
        };
    }
};
KeycloakModule = KeycloakModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [common_1.HttpModule],
        providers: [
            keycloak_protection_service_1.KeycloakProtectionService,
            keycloak_config_service_1.KeycloakConfigService,
        ],
        exports: [
            keycloak_protection_service_1.KeycloakProtectionService,
        ],
        controllers: [keycloak_controller_1.KeycloakController]
    })
], KeycloakModule);
exports.KeycloakModule = KeycloakModule;
//# sourceMappingURL=keycloak.module.js.map
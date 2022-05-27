"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakMultiTenantService = void 0;
const common_1 = require("@nestjs/common");
const keycloak_connect_1 = require("keycloak-connect");
const constants_1 = require("../constants");
let KeycloakMultiTenantService = class KeycloakMultiTenantService {
    constructor(keycloakOpts) {
        this.keycloakOpts = keycloakOpts;
        this.instances = new Map();
    }
    clear() {
        this.instances.clear();
    }
    get(realm) {
        var _a, _b;
        if (this.instances.has(realm)) {
            return this.instances.get(realm);
        }
        else {
            if (typeof this.keycloakOpts === 'string') {
                throw new Error('Keycloak configuration is a configuration path. This should not happen after module load.');
            }
            const realmSecret = (_b = (_a = this.keycloakOpts.multiTenant) === null || _a === void 0 ? void 0 : _a.realmSecretResolver) === null || _b === void 0 ? void 0 : _b.call(_a, realm);
            const secret = realmSecret || this.keycloakOpts.secret;
            const keycloakOpts = Object.assign(this.keycloakOpts, {
                realm,
                secret,
            });
            const keycloak = new keycloak_connect_1.default({}, keycloakOpts);
            keycloak.accessDenied = (req, res, next) => {
                req.resourceDenied = true;
                next();
            };
            this.instances.set(realm, keycloak);
            return keycloak;
        }
    }
};
KeycloakMultiTenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.KEYCLOAK_CONNECT_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], KeycloakMultiTenantService);
exports.KeycloakMultiTenantService = KeycloakMultiTenantService;
//# sourceMappingURL=keycloak-multitenant.service.js.map
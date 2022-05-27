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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const KeycloakConnect = require("keycloak-connect");
const constants_1 = require("../constants");
const roles_decorator_1 = require("../decorators/roles.decorator");
const keycloak_multitenant_service_1 = require("../services/keycloak-multitenant.service");
const util_1 = require("../util");
let RoleGuard = class RoleGuard {
    constructor(singleTenant, keycloakOpts, logger, multiTenant, reflector) {
        this.singleTenant = singleTenant;
        this.keycloakOpts = keycloakOpts;
        this.logger = logger;
        this.multiTenant = multiTenant;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const rolesMetaData = this.reflector.getAllAndOverride(roles_decorator_1.META_ROLES, [context.getClass(), context.getHandler()]);
        if (!rolesMetaData || rolesMetaData.roles.length === 0) {
            return true;
        }
        if (rolesMetaData && !rolesMetaData.mode) {
            rolesMetaData.mode = constants_1.RoleMatchingMode.ANY;
        }
        const rolesStr = JSON.stringify(rolesMetaData.roles);
        this.logger.verbose(`Roles: ${rolesStr}`);
        const [request] = (0, util_1.extractRequest)(context);
        const { accessTokenJWT } = request;
        if (!request) {
            return true;
        }
        if (!accessTokenJWT) {
            this.logger.warn('No access token found in request, are you sure AuthGuard is first in the chain?');
            return false;
        }
        const keycloak = (0, util_1.useKeycloak)(request, request.accessTokenJWT, this.singleTenant, this.multiTenant, this.keycloakOpts);
        const grant = await keycloak.grantManager.createGrant({
            access_token: accessTokenJWT,
        });
        const accessToken = grant.access_token;
        const granted = rolesMetaData.mode === constants_1.RoleMatchingMode.ANY
            ? rolesMetaData.roles.some(r => accessToken.hasRole(r))
            : rolesMetaData.roles.every(r => accessToken.hasRole(r));
        if (granted) {
            this.logger.verbose(`Resource granted due to role(s)`);
        }
        else {
            this.logger.verbose(`Resource denied due to mismatched role(s)`);
        }
        return granted;
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.KEYCLOAK_INSTANCE)),
    __param(1, (0, common_1.Inject)(constants_1.KEYCLOAK_CONNECT_OPTIONS)),
    __param(2, (0, common_1.Inject)(constants_1.KEYCLOAK_LOGGER)),
    __metadata("design:paramtypes", [Object, Object, common_1.Logger,
        keycloak_multitenant_service_1.KeycloakMultiTenantService,
        core_1.Reflector])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map
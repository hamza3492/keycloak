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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const KeycloakConnect = require("keycloak-connect");
const constants_1 = require("../constants");
const enforcer_options_decorator_1 = require("../decorators/enforcer-options.decorator");
const public_decorator_1 = require("../decorators/public.decorator");
const resource_decorator_1 = require("../decorators/resource.decorator");
const scopes_decorator_1 = require("../decorators/scopes.decorator");
const keycloak_connect_options_interface_1 = require("../interface/keycloak-connect-options.interface");
const keycloak_multitenant_service_1 = require("../services/keycloak-multitenant.service");
const util_1 = require("../util");
let ResourceGuard = class ResourceGuard {
    constructor(singleTenant, keycloakOpts, logger, multiTenant, reflector) {
        this.singleTenant = singleTenant;
        this.keycloakOpts = keycloakOpts;
        this.logger = logger;
        this.multiTenant = multiTenant;
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a, _b;
        const resource = this.reflector.get(resource_decorator_1.META_RESOURCE, context.getClass());
        const scopes = this.reflector.get(scopes_decorator_1.META_SCOPES, context.getHandler());
        const isUnprotected = this.reflector.getAllAndOverride(public_decorator_1.META_UNPROTECTED, [context.getClass(), context.getHandler()]);
        const enforcerOpts = this.reflector.getAllAndOverride(enforcer_options_decorator_1.META_ENFORCER_OPTIONS, [context.getClass(), context.getHandler()]);
        const pem = this.keycloakOpts.policyEnforcement || constants_1.PolicyEnforcementMode.PERMISSIVE;
        const shouldAllow = pem === constants_1.PolicyEnforcementMode.PERMISSIVE;
        if (!resource) {
            if (shouldAllow) {
                this.logger.verbose(`Controller has no @Resource defined, request allowed due to policy enforcement`);
            }
            else {
                this.logger.verbose(`Controller has no @Resource defined, request denied due to policy enforcement`);
            }
            return shouldAllow;
        }
        if (!scopes) {
            if (shouldAllow) {
                this.logger.verbose(`Route has no @Scope defined, request allowed due to policy enforcement`);
            }
            else {
                this.logger.verbose(`Route has no @Scope defined, request denied due to policy enforcement`);
            }
            return shouldAllow;
        }
        this.logger.verbose(`Protecting resource [ ${resource} ] with scopes: [ ${scopes} ]`);
        const permissions = scopes.map(scope => `${resource}:${scope}`);
        const [request, response] = (0, util_1.extractRequest)(context);
        if (!request) {
            return true;
        }
        if (!request.user && isUnprotected) {
            this.logger.verbose(`Route has no user, and is public, allowed`);
            return true;
        }
        const user = (_b = (_a = request.user) === null || _a === void 0 ? void 0 : _a.preferred_username) !== null && _b !== void 0 ? _b : 'user';
        const enforcerFn = createEnforcerContext(request, response, enforcerOpts);
        const keycloak = (0, util_1.useKeycloak)(request, request.accessTokenJWT, this.singleTenant, this.multiTenant, this.keycloakOpts);
        const isAllowed = await enforcerFn(keycloak, permissions);
        if (!isAllowed) {
            this.logger.verbose(`Resource [ ${resource} ] denied to [ ${user} ]`);
        }
        else {
            this.logger.verbose(`Resource [ ${resource} ] granted to [ ${user} ]`);
        }
        return isAllowed;
    }
};
ResourceGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.KEYCLOAK_INSTANCE)),
    __param(1, (0, common_1.Inject)(constants_1.KEYCLOAK_CONNECT_OPTIONS)),
    __param(2, (0, common_1.Inject)(constants_1.KEYCLOAK_LOGGER)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof keycloak_connect_options_interface_1.KeycloakConnectConfig !== "undefined" && keycloak_connect_options_interface_1.KeycloakConnectConfig) === "function" ? _a : Object, common_1.Logger, typeof (_b = typeof keycloak_multitenant_service_1.KeycloakMultiTenantService !== "undefined" && keycloak_multitenant_service_1.KeycloakMultiTenantService) === "function" ? _b : Object, core_1.Reflector])
], ResourceGuard);
exports.ResourceGuard = ResourceGuard;
const createEnforcerContext = (request, response, options) => (keycloak, permissions) => new Promise((resolve, _) => keycloak.enforcer(permissions, options)(request, response, (_) => {
    if (request.resourceDenied) {
        resolve(false);
    }
    else {
        resolve(true);
    }
}));
//# sourceMappingURL=resource.guard.js.map
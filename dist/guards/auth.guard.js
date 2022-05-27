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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const KeycloakConnect = require("keycloak-connect");
const constants_1 = require("../constants");
const public_decorator_1 = require("../decorators/public.decorator");
const keycloak_connect_options_interface_1 = require("../interface/keycloak-connect-options.interface");
const keycloak_multitenant_service_1 = require("../services/keycloak-multitenant.service");
const util_1 = require("../util");
let AuthGuard = class AuthGuard {
    constructor(singleTenant, keycloakOpts, logger, multiTenant, reflector) {
        this.singleTenant = singleTenant;
        this.keycloakOpts = keycloakOpts;
        this.logger = logger;
        this.multiTenant = multiTenant;
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        const isUnprotected = this.reflector.getAllAndOverride(public_decorator_1.META_UNPROTECTED, [context.getClass(), context.getHandler()]);
        const skipAuth = this.reflector.getAllAndOverride(public_decorator_1.META_SKIP_AUTH, [
            context.getClass(),
            context.getHandler(),
        ]);
        if (isUnprotected && skipAuth) {
            return true;
        }
        const [request] = (0, util_1.extractRequest)(context);
        if (!request) {
            return true;
        }
        const jwt = (_a = this.extractJwtFromCookie(request.cookies)) !== null && _a !== void 0 ? _a : this.extractJwt(request.headers);
        const isJwtEmpty = jwt === null || jwt === undefined;
        if (isJwtEmpty && !skipAuth && isUnprotected) {
            this.logger.verbose('Empty JWT, skipAuth disabled, and a publicly marked route, allowed for fallback');
            return true;
        }
        if (isJwtEmpty) {
            this.logger.verbose('Empty JWT, unauthorized');
            throw new common_1.UnauthorizedException();
        }
        this.logger.verbose(`User JWT: ${jwt}`);
        const keycloak = (0, util_1.useKeycloak)(request, jwt, this.singleTenant, this.multiTenant, this.keycloakOpts);
        const isValidToken = await this.validateToken(keycloak, jwt);
        if (isValidToken) {
            request.user = (0, util_1.parseToken)(jwt);
            request.accessTokenJWT = jwt;
            this.logger.verbose(`Authenticated User: ${JSON.stringify(request.user)}`);
            return true;
        }
        throw new common_1.UnauthorizedException();
    }
    async validateToken(keycloak, jwt) {
        const tokenValidation = this.keycloakOpts.tokenValidation || constants_1.TokenValidation.ONLINE;
        const gm = keycloak.grantManager;
        let grant;
        try {
            grant = await gm.createGrant({ access_token: jwt });
        }
        catch (ex) {
            this.logger.warn(`Cannot validate access token: ${ex}`);
            return false;
        }
        const token = grant.access_token;
        this.logger.verbose(`Using token validation method: ${tokenValidation.toUpperCase()}`);
        try {
            let result;
            switch (tokenValidation) {
                case constants_1.TokenValidation.ONLINE:
                    result = await gm.validateAccessToken(token);
                    return result === token;
                case constants_1.TokenValidation.OFFLINE:
                    result = await gm.validateToken(token, 'Bearer');
                    return result === token;
                case constants_1.TokenValidation.NONE:
                    return true;
                default:
                    this.logger.warn(`Unknown validation method: ${tokenValidation}`);
                    return false;
            }
        }
        catch (ex) {
            this.logger.warn(`Cannot validate access token: ${ex}`);
        }
        return false;
    }
    extractJwt(headers) {
        if (headers && !headers.authorization) {
            this.logger.verbose(`No authorization header`);
            return null;
        }
        const auth = headers.authorization.split(' ');
        if (auth[0].toLowerCase() !== 'bearer') {
            this.logger.verbose(`No bearer header`);
            return null;
        }
        return auth[1];
    }
    extractJwtFromCookie(cookies) {
        const cookieKey = this.keycloakOpts.cookieKey || constants_1.KEYCLOAK_COOKIE_DEFAULT;
        return cookies && cookies[cookieKey];
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.KEYCLOAK_INSTANCE)),
    __param(1, (0, common_1.Inject)(constants_1.KEYCLOAK_CONNECT_OPTIONS)),
    __param(2, (0, common_1.Inject)(constants_1.KEYCLOAK_LOGGER)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof keycloak_connect_options_interface_1.KeycloakConnectConfig !== "undefined" && keycloak_connect_options_interface_1.KeycloakConnectConfig) === "function" ? _a : Object, common_1.Logger, typeof (_b = typeof keycloak_multitenant_service_1.KeycloakMultiTenantService !== "undefined" && keycloak_multitenant_service_1.KeycloakMultiTenantService) === "function" ? _b : Object, core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
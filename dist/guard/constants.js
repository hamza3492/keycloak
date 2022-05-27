"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = exports.PolicyEnforcementMode = exports.RoleMatchingMode = exports.KEYCLOAK_COOKIE_DEFAULT = exports.KEYCLOAK_LOGGER = exports.KEYCLOAK_MULTITENANT_SERVICE = exports.KEYCLOAK_INSTANCE = exports.KEYCLOAK_CONNECT_OPTIONS = void 0;
exports.KEYCLOAK_CONNECT_OPTIONS = 'KEYCLOAK_CONNECT_OPTIONS';
exports.KEYCLOAK_INSTANCE = 'KEYCLOAK_INSTANCE';
exports.KEYCLOAK_MULTITENANT_SERVICE = 'KEYCLOAK_MULTITENANT_SERVICE';
exports.KEYCLOAK_LOGGER = 'KEYCLOAK_LOGGER';
exports.KEYCLOAK_COOKIE_DEFAULT = 'KEYCLOAK_JWT';
var RoleMatchingMode;
(function (RoleMatchingMode) {
    RoleMatchingMode["ALL"] = "all";
    RoleMatchingMode["ANY"] = "any";
})(RoleMatchingMode = exports.RoleMatchingMode || (exports.RoleMatchingMode = {}));
var PolicyEnforcementMode;
(function (PolicyEnforcementMode) {
    PolicyEnforcementMode["ENFORCING"] = "enforcing";
    PolicyEnforcementMode["PERMISSIVE"] = "permissive";
})(PolicyEnforcementMode = exports.PolicyEnforcementMode || (exports.PolicyEnforcementMode = {}));
var TokenValidation;
(function (TokenValidation) {
    TokenValidation["ONLINE"] = "online";
    TokenValidation["OFFLINE"] = "offline";
    TokenValidation["NONE"] = "none";
})(TokenValidation = exports.TokenValidation || (exports.TokenValidation = {}));
//# sourceMappingURL=constants.js.map
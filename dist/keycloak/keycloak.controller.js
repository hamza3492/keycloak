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
exports.KeycloakController = void 0;
const common_1 = require("@nestjs/common");
const keycloak_protection_service_1 = require("./keycloak-protection.service");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
let KeycloakController = class KeycloakController {
    constructor(keycloakProtectionService) {
        this.keycloakProtectionService = keycloakProtectionService;
    }
    createResource(body, request, user) {
        console.log(user);
        return this.keycloakProtectionService.createResource(body);
    }
    getResource(resourceId) {
        return this.keycloakProtectionService.getOne(resourceId);
    }
    getAllResources(owner) {
        return this.keycloakProtectionService.getAllResources(owner);
    }
    updateResource(resourceId, body) {
        return this.keycloakProtectionService.updateResource(resourceId, body);
    }
    deleteResource(resourceId) {
        return this.keycloakProtectionService.deleteResource(resourceId);
    }
    createRefreshToken(body) {
        return this.keycloakProtectionService.getRefreshToken();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "createResource", null);
__decorate([
    (0, common_1.Get)(':resourceId'),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "getResource", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Query)('owner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "getAllResources", null);
__decorate([
    (0, common_1.Patch)(':resourceId'),
    __param(0, (0, common_1.Param)('resourceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Delete)(':resourceId'),
    __param(0, (0, common_1.Param)('resourceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "deleteResource", null);
__decorate([
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KeycloakController.prototype, "createRefreshToken", null);
KeycloakController = __decorate([
    (0, common_1.Controller)('keycloak'),
    (0, nest_keycloak_connect_1.Resource)('create-post'),
    __metadata("design:paramtypes", [keycloak_protection_service_1.KeycloakProtectionService])
], KeycloakController);
exports.KeycloakController = KeycloakController;
//# sourceMappingURL=keycloak.controller.js.map
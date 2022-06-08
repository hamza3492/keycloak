"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resources = void 0;
const express_1 = require("express");
class Resources {
    constructor(httpService, keycloakService) {
        this.httpService = httpService;
        this.keycloakService = keycloakService;
    }
    async ResourcesName() {
        const ResourceData = await this.keycloakService.query(express_1.request.body.name);
    }
    async resourceName() {
        try {
            console.log(express_1.request);
            const result = this.httpService
                .get('https://accounts.mevris.app/auth/realms/keycloak-testing/authz/protection/resource_set?owner=user1', {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).toPromise();
            console.log(result);
            return result;
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.Resources = Resources;
//# sourceMappingURL=resourceFile.js.map
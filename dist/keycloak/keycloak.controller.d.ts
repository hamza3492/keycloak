import { Request } from 'express';
import { KeycloakProtectionService } from './keycloak-protection.service';
export declare class KeycloakController {
    private readonly keycloakProtectionService;
    constructor(keycloakProtectionService: KeycloakProtectionService);
    createResource(body: any, request: Request, user: any): Promise<any>;
    getResource(resourceId: string): Promise<any>;
    getAllResources(owner: string): Promise<any>;
    updateResource(resourceId: string, body: any): Promise<any>;
    deleteResource(resourceId: string): Promise<any>;
    createRefreshToken(body: any): Promise<any>;
}

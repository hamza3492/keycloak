import { HttpService } from "@nestjs/common";
import { KeycloakProtectionService } from '../../keycloak/keycloak-protection.service';
export declare class Resources {
    private readonly httpService;
    private readonly keycloakService;
    constructor(httpService: HttpService, keycloakService: KeycloakProtectionService);
    ResourcesName(): Promise<any>;
    resourceName(): Promise<any>;
}

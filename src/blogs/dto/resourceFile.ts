import { HttpService, Body, Req } from "@nestjs/common";
import { request } from "express";
import axios from 'axios';
import { KeycloakProtectionService } from '../../keycloak/keycloak-protection.service'



export class Resources {
    constructor(
        private readonly httpService: HttpService,
        private readonly keycloakService: KeycloakProtectionService
    ) { }

    public async ResourcesName(): Promise<any> {
        const ResourceData = await this.keycloakService.query(request.body.name)

    }

    public async resourceName(): Promise<any> {
        try {
            console.log(request);

            const result = this.httpService
                .get('https://accounts.mevris.app/auth/realms/keycloak-testing/authz/protection/resource_set?owner=user1', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).toPromise()
            console.log(result)
            return result
        }
        catch (err) {
            console.error(err);
        }

    }
}
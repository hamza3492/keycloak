import { Controller, Post, Body, Get, Param, Delete, Patch, Req, Query } from '@nestjs/common';
import { Request } from 'express'
import { KeycloakProtectionService } from './keycloak-protection.service';
import { Resource, Roles, Scopes, AuthenticatedUser } from 'nest-keycloak-connect';


@Controller('keycloak')
@Resource('create-post') // user 1
// @Resource('view-post') // user 2
// @Resource('create-view-post') // user 3
// @Resource('complete-access') // user 4 and user 5  
// @Resource('full-access') // user 5

export class KeycloakController {
    constructor(private readonly keycloakProtectionService: KeycloakProtectionService) { }

    @Post()
    @Scopes('view')
    createResource(@Body() body: any, @Req() request: Request, @AuthenticatedUser() user: any) {
        console.log(user)
        return this.keycloakProtectionService.createResource(body);
    }

    @Get(':resourceId')
    getResource(@Param('resourceId') resourceId: string) {
        return this.keycloakProtectionService.getOne(resourceId)
    }

    @Get()
    @Scopes('view')
    getAllResources(@Query('owner') owner: string) {
        return this.keycloakProtectionService.getAllResources(owner)
    }

    @Patch(':resourceId')
    updateResource(@Param('resourceId') resourceId: string, @Body() body: any) {
        return this.keycloakProtectionService.updateResource(resourceId, body)
    }

    @Delete(':resourceId')
    deleteResource(@Param('resourceId') resourceId: string) {
        return this.keycloakProtectionService.deleteResource(resourceId)
    }

    @Post('/refresh')
    createRefreshToken(@Body() body: any) {
        return this.keycloakProtectionService.getRefreshToken()
    }
}


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
exports.DeleteBlogHandler = void 0;
const deleteBlog_command_1 = require("../implementation/deleteBlog.command");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../../blogs.entity");
const common_1 = require("@nestjs/common");
const keycloak_protection_service_1 = require("../../../keycloak/keycloak-protection.service");
let DeleteBlogHandler = class DeleteBlogHandler {
    constructor(blogRepository, keycloakProtectionService) {
        this.blogRepository = blogRepository;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async execute(command) {
        const { id, username } = command;
        const usersRecordIds = await this.keycloakProtectionService.query({ owner: username });
        console.log(usersRecordIds);
        const data = await this.blogRepository.findOne({ id: command.id });
        console.log(data, "DATA");
        if (!data) {
            throw new common_1.HttpException('No data found', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(usersRecordIds.includes(data.id.toString()));
        if (usersRecordIds.includes(data.id.toString())) {
            await this.blogRepository.delete(command.id);
            const deleteResourceById = await this.keycloakProtectionService.deleteResource(command.id.toString());
            return data;
        }
        else {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
DeleteBlogHandler = __decorate([
    (0, cqrs_1.CommandHandler)(deleteBlog_command_1.DeleteBlogCommand),
    __param(0, (0, typeorm_2.InjectRepository)(blogs_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        keycloak_protection_service_1.KeycloakProtectionService])
], DeleteBlogHandler);
exports.DeleteBlogHandler = DeleteBlogHandler;
//# sourceMappingURL=deleteBlog.handler.js.map
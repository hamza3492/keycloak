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
exports.UpdateBlogHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const updateBlog_command_1 = require("../implementation/updateBlog.command");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../../blogs.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const keycloak_protection_service_1 = require("../../../keycloak/keycloak-protection.service");
let UpdateBlogHandler = class UpdateBlogHandler {
    constructor(blogRepository, keycloakProtectionService) {
        this.blogRepository = blogRepository;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async execute(command) {
        try {
            const { username, id, blog } = command;
            const usersRecordIds = await this.keycloakProtectionService.query({ owner: username });
            const data = await this.blogRepository.findOne({ id: command.id });
            if (!data) {
                throw new common_1.HttpException('Not data found', common_1.HttpStatus.NOT_FOUND);
            }
            if (usersRecordIds.includes(data.id)) {
                const updatedData = await this.blogRepository.update(command.id, command.blog);
                await this.keycloakProtectionService.updateResource(command.id, { name: blog.name });
                return updatedData;
            }
            else {
                throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
};
UpdateBlogHandler = __decorate([
    (0, cqrs_1.CommandHandler)(updateBlog_command_1.UpdateBlogCommand),
    __param(0, (0, typeorm_1.InjectRepository)(blogs_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        keycloak_protection_service_1.KeycloakProtectionService])
], UpdateBlogHandler);
exports.UpdateBlogHandler = UpdateBlogHandler;
//# sourceMappingURL=updateBlog.handler.js.map
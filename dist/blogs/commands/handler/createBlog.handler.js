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
exports.CreateBlogHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const createBlog_command_1 = require("../implementation/createBlog.command");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../../blogs.entity");
const typeorm_2 = require("typeorm");
const keycloak_protection_service_1 = require("../../../keycloak/keycloak-protection.service");
let CreateBlogHandler = class CreateBlogHandler {
    constructor(blogRepository, keycloakProtectionService) {
        this.blogRepository = blogRepository;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async execute(command) {
        console.log(command, "Test  ");
        const newBlog = this.blogRepository.create(Object.assign(Object.assign({}, command.blog), { id: command.blog.id }));
        console.log(command.user_id);
        await this.blogRepository.save(newBlog);
        const resourceData = {
            name: command.blog.name,
            _id: command.blog.id,
            owner: {
                id: command.user_id,
            },
            ownerManagedAccess: true,
            resource_scopes: [
                "create",
                "view",
                "edit"
            ],
            scopes: ["create", "view", "edit"]
        };
        await this.keycloakProtectionService.createResource(resourceData);
        return newBlog;
    }
};
CreateBlogHandler = __decorate([
    (0, cqrs_1.CommandHandler)(createBlog_command_1.CreateBlogCommand),
    __param(0, (0, typeorm_1.InjectRepository)(blogs_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        keycloak_protection_service_1.KeycloakProtectionService])
], CreateBlogHandler);
exports.CreateBlogHandler = CreateBlogHandler;
//# sourceMappingURL=createBlog.handler.js.map
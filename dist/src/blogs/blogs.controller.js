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
const common_1 = require("@nestjs/common");
const createBlog_dto_1 = require("./dto/createBlog.dto");
const cqrs_1 = require("@nestjs/cqrs");
const createBlog_command_1 = require("./commands/implementation/createBlog.command");
const getBlogAll_query_1 = require("./queries/implementations/getBlogAll.query");
const getBlog_dto_1 = require("./dto/getBlog.dto");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
const keycloak_protection_service_1 = require("../keycloak/keycloak-protection.service");
const updateBlog_dto_1 = require("./dto/updateBlog.dto");
const updateBlog_command_1 = require("./commands/implementation/updateBlog.command");
const deleteBlog_command_1 = require("./commands/implementation/deleteBlog.command");
const getOneBlog_query_1 = require("./queries/implementations/getOneBlog.query");
let BlogsController = class BlogsController {
    constructor(commandBus, queryBus, keycloakProtectionService) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async createBlog(blog, user) {
        console.log(user, 'User');
        const user_id = user.sub;
        return this.commandBus.execute(new createBlog_command_1.CreateBlogCommand(blog, user_id));
    }
    async getOneBlogs({ blogId }, id, user) {
        console.log(user);
        return this.queryBus.execute(new getOneBlog_query_1.GetOneBlogQuery(Number(id), user.preferred_username));
    }
    async getBlogs({ blogId }, user) {
        console.log(user);
        return this.queryBus.execute(new getBlogAll_query_1.GetAllBlogsQuery(user.preferred_username));
    }
    async updateBlog(id, blog, user) {
        const username = user.preferred_username;
        console.log(username, "Username");
        await this.keycloakProtectionService.updateResource(id, blog.name);
        return this.commandBus.execute(new updateBlog_command_1.UpdateBlogCommand((id), blog, username));
    }
    async deleteBlog(id, user) {
        const user_id = user.sub;
        await this.keycloakProtectionService.deleteResource(id);
        return this.commandBus.execute(new deleteBlog_command_1.DeleteBlogCommand(Number(id), user.preferred_username));
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBlog_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getBlog_dto_1.default, String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getOneBlogs", null);
__decorate([
    (0, common_1.Get)(),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getBlog_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, nest_keycloak_connect_1.Scopes)('create'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateBlog_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, nest_keycloak_connect_1.Scopes)('view'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, nest_keycloak_connect_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    (0, nest_keycloak_connect_1.Resource)('ORIENT1'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        keycloak_protection_service_1.KeycloakProtectionService])
], BlogsController);
exports.default = BlogsController;
//# sourceMappingURL=blogs.controller.js.map
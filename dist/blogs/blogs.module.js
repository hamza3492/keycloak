"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const blogs_controller_1 = require("./blogs.controller");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("./blogs.entity");
const createBlog_handler_1 = require("./commands/handler/createBlog.handler");
const keycloak_module_1 = require("../keycloak/keycloak.module");
const getBlog_handler_1 = require("./queries/handler/getBlog.handler");
const updateBlog_handler_1 = require("./commands/handler/updateBlog.handler");
const deleteBlog_handler_1 = require("./commands/handler/deleteBlog.handler");
const getOneBlog_handler_1 = require("./queries/handler/getOneBlog.handler");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blogs_entity_1.default]), cqrs_1.CqrsModule, keycloak_module_1.KeycloakModule,],
        controllers: [blogs_controller_1.default],
        providers: [createBlog_handler_1.CreateBlogHandler, getBlog_handler_1.GetBlogsHandler, updateBlog_handler_1.UpdateBlogHandler, deleteBlog_handler_1.DeleteBlogHandler, getOneBlog_handler_1.GetOneBlogHandler],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map
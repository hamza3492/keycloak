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
exports.GetBlogsHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const getBlogAll_query_1 = require("../implementations/getBlogAll.query");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("../../blogs.entity");
const typeorm_2 = require("typeorm");
const keycloak_protection_service_1 = require("../../../keycloak/keycloak-protection.service");
let GetBlogsHandler = class GetBlogsHandler {
    constructor(blogsRepository, keycloakProtectionService) {
        this.blogsRepository = blogsRepository;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async execute(query) {
        try {
            console.log(query, "BLOG_ID");
            const { username } = query;
            const usersRecordIds = await this.keycloakProtectionService.query({ owner: username });
            console.log(usersRecordIds, "RECORDS");
            return await this.blogsRepository.find({ id: (0, typeorm_2.In)(usersRecordIds) });
        }
        catch (err) {
            console.log(err);
        }
    }
};
GetBlogsHandler = __decorate([
    (0, cqrs_1.QueryHandler)(getBlogAll_query_1.GetAllBlogsQuery),
    __param(0, (0, typeorm_1.InjectRepository)(blogs_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        keycloak_protection_service_1.KeycloakProtectionService])
], GetBlogsHandler);
exports.GetBlogsHandler = GetBlogsHandler;
//# sourceMappingURL=getBlog.handler.js.map
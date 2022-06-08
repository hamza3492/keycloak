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
exports.GetOneBlogHandler = void 0;
const blogs_entity_1 = require("../../blogs.entity");
const cqrs_1 = require("@nestjs/cqrs");
const getOneBlog_query_1 = require("../implementations/getOneBlog.query");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const keycloak_protection_service_1 = require("../../../keycloak/keycloak-protection.service");
const common_1 = require("@nestjs/common");
let GetOneBlogHandler = class GetOneBlogHandler {
    constructor(blogsRepository, keycloakProtectionService) {
        this.blogsRepository = blogsRepository;
        this.keycloakProtectionService = keycloakProtectionService;
    }
    async execute(query) {
        console.log(query.ID, 'Query Id');
        const { username } = query;
        this.keycloakProtectionService.getOne(query.ID);
        const usersRecordIds = await this.keycloakProtectionService.query({ owner: username });
        console.log(usersRecordIds, "RECORDS");
        const result = await this.blogsRepository.findOne({ where: { id: query.ID } });
        if (!result) {
            throw new common_1.HttpException('No Data Found', common_1.HttpStatus.NOT_FOUND);
        }
        console.log(usersRecordIds.includes(result.id.toString()));
        if (usersRecordIds.includes(result.id.toString())) {
            return result;
        }
        else {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
GetOneBlogHandler = __decorate([
    (0, cqrs_1.QueryHandler)(getOneBlog_query_1.GetOneBlogQuery),
    __param(0, (0, typeorm_2.InjectRepository)(blogs_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        keycloak_protection_service_1.KeycloakProtectionService])
], GetOneBlogHandler);
exports.GetOneBlogHandler = GetOneBlogHandler;
//# sourceMappingURL=getOneBlog.handler.js.map
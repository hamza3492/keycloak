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
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const post_entity_1 = require("./post.entity");
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    getAllPosts() {
        return this.postsRepository;
    }
    createPost(post) {
        const newPost = this.postsRepository.create(post);
        return newPost;
    }
    getPostById(id) {
        const post = this.postsRepository.findOne(id);
        if (!post) {
            throw new common_1.HttpException('No Post Found', common_1.HttpStatus.NOT_FOUND);
        }
        return post;
    }
    async deletePost(id) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(post_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PostsService);
exports.default = PostsService;
//# sourceMappingURL=posts.service.js.map
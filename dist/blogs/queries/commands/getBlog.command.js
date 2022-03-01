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
exports.CreateCommentHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const createComment_command_1 = require("../implementations/createComment.command");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("../../comment.entity");
const typeorm_2 = require("typeorm");
let CreateCommentHandler = class CreateCommentHandler {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async execute(command) {
        const newPost = this.commentsRepository.create(Object.assign(Object.assign({}, command.comment), { author: command.author }));
        await this.commentsRepository.save(newPost);
        return newPost;
    }
};
CreateCommentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(createComment_command_1.CreateCommentCommand),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreateCommentHandler);
exports.CreateCommentHandler = CreateCommentHandler;
//# sourceMappingURL=getBlog.command.js.map
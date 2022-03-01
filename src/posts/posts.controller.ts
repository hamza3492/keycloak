import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { Resource, Roles, Scopes, } from 'nest-keycloak-connect';

@Controller('posts')
// @Resource('create-post') // user 1
@Resource('view-post') // user 2
// @Resource('create-view-post') // user 3
// @Resource('complete-access') // user 4 and user 5  
// @Resource('full-access') // user 5
export default class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) { }

    @Get()
    // @Roles({ roles: ['admin', 'users'] })
    @Scopes('view')
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    @Scopes('view')
    // @Roles({ roles: ['users'] })
    getPostById(@Param('id') id: string) {
        return this.postsService.getPostById(Number(id));
    }

    @Post('/admin')
    // @Resource('res:account')
    // @Roles({ roles: ['admin'] })
    @Scopes('create')
    async createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    }

    // @Put(':id')
    // async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    //     return this.postsService.updatePost(Number(id), post);
    // }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        this.postsService.deletePost(Number(id));
    }

}

import {
    Body,
    Controller, Get,
    Patch,
    Post, Query,
    UseGuards,
    Param,
    Delete,
    Put
} from '@nestjs/common';
import CreateBlogDto from './dto/createBlog.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBlogCommand } from './commands/implementation/createBlog.command';
import { GetAllBlogsQuery } from './queries/implementations/getBlogAll.query';
import GetBlogDto from './dto/getBlog.dto';
import { Resource, Roles, Scopes, AuthenticatedUser, ResourceGuard, AuthGuard, } from 'nest-keycloak-connect';
import { KeycloakProtectionService } from '../keycloak/keycloak-protection.service';
// import Blogs from './blogs.entity'
import UpdateBlogDto from './dto/updateBlog.dto';
import { UpdateBlogCommand } from './commands/implementation/updateBlog.command';
import { DeleteBlogCommand } from './commands/implementation/deleteBlog.command';
import { GetOneBlogQuery } from './queries/implementations/getOneBlog.query';

@Controller('blogs')
// @Resource('blogs')
// @Resource('ORIENT1')
@Resource('ORIENT4')
// @UseGuards(ResourceGuard)
// @Resource(Blogs.name)
// @UseGuards(ResourceGuard)
export default class BlogsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private readonly keycloakProtectionService: KeycloakProtectionService
    ) { }

    @Post()
    // @Resource('view-post')
    @Scopes('view')
    // @UseGuards(JwtAuthenticationGuard)
    async createBlog(@Body() blog: CreateBlogDto, @AuthenticatedUser() user: any) {
        // console.log(user.sub);
        const user_id = user.sub
        // console.log(typeof user_id)
        return this.commandBus.execute(
            new CreateBlogCommand(blog, user_id)
        )
    }

    @Get(':id')
    @Scopes('view')
    async getOneBlogs(
        @Query() { blogId }: GetBlogDto, @Param('id') id: string, @AuthenticatedUser() user: any,
    ) {
        console.log(user)
        // const username = user.preferred_username
        // await this.keycloakProtectionService.getAllResources(username)
        return this.queryBus.execute(
            new GetOneBlogQuery(Number(id), user.preferred_username)
        )
    }

    @Get()
    // @FetchResources()
    @Scopes('view')
    async getBlogs(
        @Query() { blogId }: GetBlogDto, @AuthenticatedUser() user: any,
    ) {
        console.log(user)
        // const username = user.preferred_username
        // await this.keycloakProtectionService.getAllResources(username)
        return this.queryBus.execute(
            new GetAllBlogsQuery(user.preferred_username)
        )
    }

    @Put(':id')
    @Scopes('create')
    // @Scopes('view')
    async updateBlog(@Param('id') id: string, @Body() blog: UpdateBlogDto, @AuthenticatedUser() user: any) {
        const username = user.preferred_username
        console.log(username, "Username")
        await this.keycloakProtectionService.updateResource('38', blog.name)
        return this.commandBus.execute(new UpdateBlogCommand((id), blog, username))
    }

    @Delete(':id')
    @Scopes('view')
    async deleteBlog(@Param('id') id: string, @AuthenticatedUser() user: any) {
        const user_id = user.sub
        await this.keycloakProtectionService.deleteResource('38')
        return this.commandBus.execute(new DeleteBlogCommand(Number(id), user.preferred_username))
    }
}


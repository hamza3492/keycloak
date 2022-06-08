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
import { Roles, Scopes, AuthenticatedUser, ResourceGuard, AuthGuard, } from 'nest-keycloak-connect';
import { KeycloakProtectionService } from '../keycloak/keycloak-protection.service';
// import Blogs from './blogs.entity'
import UpdateBlogDto from './dto/updateBlog.dto';
import { UpdateBlogCommand } from './commands/implementation/updateBlog.command';
import { DeleteBlogCommand } from './commands/implementation/deleteBlog.command';
import { GetOneBlogQuery } from './queries/implementations/getOneBlog.query';
import { Blog } from './blog'
import { Resource } from '../../guard/decorators/resource.decorator';
import {Resources} from '../blogs/dto/resourceFile'

// Resource
// scope
// resource_id
// @Permission() // scope, r    esourceId
@Controller('blogs')
// @Resource(Blog.name)
// @Resource('blogs')   
// @Resource(`${Resources}`)
// @Resource('ORIENT1')
// @Resource('ORIENT4')
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
    // @Scopes('create')
    @Scopes('create')
    // @UseGuards(JwtAuthenticationGuard)
    async createBlog(@Body() blog: CreateBlogDto, @AuthenticatedUser() user: any) {

        console.log(user, 'User');
        // console.log(user.sub, 'ID OF USER');
        const user_id = user.sub
        // console.log(typeof user_id)
        return this.commandBus.execute(
            new CreateBlogCommand(blog, user_id)
        )
    }

    @Get(':id')
    @Scopes('view')
    // @ResourceId({ id: 'blogId' })
    // @Resource('Product', {id: 'blogId'})
    async getOneBlogs(
        @Query() { blogId }: GetBlogDto, @Param('id') id: string, @AuthenticatedUser() user: any,
    ) {
        console.log(user)
        // const username = user.preferred_username
        // await this.keycloakProtectionService.getAllResources(username)
        return this.queryBus.execute(
            new GetOneBlogQuery(id, user.preferred_username)
        )
    }

    @Get()
    // @FetchResources()
    @Scopes('view')
    async getBlogs(
        @Query() { blogId }: GetBlogDto, @AuthenticatedUser() user: any,
    ) {
        // console.log(Blog.name, 'BLOG NAME');

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
        // console.log(username, "Username")    
        await this.keycloakProtectionService.updateResource(id, blog.name)
        return this.commandBus.execute(new UpdateBlogCommand((id), blog, username))
    }

    @Delete(':id')
    @Scopes('view')
    async deleteBlog(@Param('id') id: string, @AuthenticatedUser() user: any) {
        const user_id = user.sub
        // await this.keycloakProtectionService.deleteResource(id)
        return this.commandBus.execute(new DeleteBlogCommand(id, user.preferred_username))
    }
}


import CreateBlogDto from './dto/createBlog.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import GetBlogDto from './dto/getBlog.dto';
import { KeycloakProtectionService } from '../keycloak/keycloak-protection.service';
import UpdateBlogDto from './dto/updateBlog.dto';
export default class BlogsController {
    private commandBus;
    private queryBus;
    private readonly keycloakProtectionService;
    constructor(commandBus: CommandBus, queryBus: QueryBus, keycloakProtectionService: KeycloakProtectionService);
    createBlog(blog: CreateBlogDto, user: any): Promise<any>;
    getOneBlogs({ blogId }: GetBlogDto, id: string, user: any): Promise<any>;
    getBlogs({ blogId }: GetBlogDto, user: any): Promise<any>;
    updateBlog(id: string, blog: UpdateBlogDto, user: any): Promise<any>;
    deleteBlog(id: string, user: any): Promise<any>;
}

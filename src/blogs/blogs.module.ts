import { Module } from '@nestjs/common';
import BlogsController from './blogs.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm'
import Blogs from './blogs.entity';
import { CreateBlogHandler } from './commands/handler/createBlog.handler';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { GetBlogsHandler } from './queries/handler/getBlog.handler';
import { UpdateBlogHandler } from './commands/handler/updateBlog.handler';
import { DeleteBlogHandler } from './commands/handler/deleteBlog.handler';
import { GetOneBlogHandler } from './queries/handler/getOneBlog.handler';


@Module({
  imports: [TypeOrmModule.forFeature([Blogs]), CqrsModule, KeycloakModule,],
  controllers: [BlogsController],
  providers: [CreateBlogHandler, GetBlogsHandler, UpdateBlogHandler, DeleteBlogHandler, GetOneBlogHandler],

})
export class BlogsModule { }

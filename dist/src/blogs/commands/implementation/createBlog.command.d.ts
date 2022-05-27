import { CreateBlogDto } from '../../dto/createBlog.dto';
export declare class CreateBlogCommand {
    readonly blog: CreateBlogDto;
    readonly user_id: any;
    constructor(blog: CreateBlogDto, user_id: any);
}

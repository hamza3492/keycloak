import UpdateBlogDto from '../../dto/updateBlog.dto';
export declare class UpdateBlogCommand {
    id: string;
    blog: UpdateBlogDto;
    username: string;
    constructor(id: string, blog: UpdateBlogDto, username: string);
}

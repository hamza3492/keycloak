// import Users from '../../../users/users.entity';
import UpdateBlogDto from '../../dto/updateBlog.dto';

export class UpdateBlogCommand {
    constructor(
        public id: string,
        public blog: UpdateBlogDto,
        public username: string,

        // public readonly author: Users,
    ) { }
}   
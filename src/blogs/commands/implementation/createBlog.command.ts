// import Users from '../../../users/users.entity';
import { CreateBlogDto } from '../../dto/createBlog.dto';

export class CreateBlogCommand {
    constructor(
        public readonly blog: CreateBlogDto,
        public readonly user_id: any,

        // public readonly author: Users,
    ) { }
}   
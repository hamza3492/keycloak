import CreatePostDto from './dto/createPost.dto';
import { Repository } from 'typeorm';
import Posts from './post.entity';
export default class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Posts>);
    getAllPosts(): Repository<Posts>;
    createPost(post: CreatePostDto): Posts;
    getPostById(id: number): Promise<Posts>;
    deletePost(id: number): Promise<void>;
}

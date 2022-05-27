import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
export default class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): import("typeorm").Repository<import("./post.entity").default>;
    getPostById(id: string): Promise<import("./post.entity").default>;
    createPost(post: CreatePostDto): Promise<import("./post.entity").default>;
    deletePost(id: string): Promise<void>;
}

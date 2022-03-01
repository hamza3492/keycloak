import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { Post } from './post.interface';
import Posts from './post.entity';

@Injectable()
export default class PostsService {
    // private lastPostId = 0
    // private posts: Post[] = [];

    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>
    ) { }

    getAllPosts() {
        return this.postsRepository;
    }

    createPost(post: CreatePostDto) {
        const newPost = this.postsRepository.create(post);
        return newPost;
    }


    getPostById(id: number) {
        const post = this.postsRepository.findOne(id);

        if (!post) {
            throw new HttpException('No Post Found', HttpStatus.NOT_FOUND);
        }

        return post
    }

    // async updatePost(id: number, post: UpdatePostDto) {
    //     const updatedPost = await this.postsRepository.update(id, post);

    //     if (updatedPost) {
    //         return updatedPost;
    //     }
    //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    // }

    async deletePost(id: number) {
        const deleteResponse = await this.postsRepository.delete(id);
        if (!deleteResponse.affected) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
    }

}


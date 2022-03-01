
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from '../implementations/getBlogAll.query';
import { InjectRepository } from '@nestjs/typeorm';
import Blogs from '../../blogs.entity';
import { In, Repository } from 'typeorm';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service';
import { Console } from 'console';

@QueryHandler(GetAllBlogsQuery)
export class GetBlogsHandler implements IQueryHandler<GetAllBlogsQuery> {
    constructor(
        @InjectRepository(Blogs)
        private blogsRepository: Repository<Blogs>,
        private keycloakProtectionService: KeycloakProtectionService,
    ) { }

    // async execute(query: GetAllBlogsQuery) {
    //     if (query.blogId) {
    //         return this.blogsRepository.find({
    //             blog: {
    //                 id: query.blogId,
    //             }
    //         });
    //     }
    //     return this.blogsRepository.find();
    // }

    async execute(query: GetAllBlogsQuery): Promise<any> {
        try {

            console.log(query, "BLOG_ID")

            const { username } = query;

            const usersRecordIds: number[] = await this.keycloakProtectionService.query({ owner: username });
            console.log(usersRecordIds, "RECORDS")

            // const convert = usersRecordIds.map(ids => Number(ids))
            // console.log(convert)

            // console.log(convert)

            return await this.blogsRepository.find({ id: In(usersRecordIds) });
            // const userResources = await this.blogsRepository.find();
            // console.log(userResources)
            // return userResources 
        } catch (err) {
            console.log(err)
        }
    }
}
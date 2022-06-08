import Blogs from '../../blogs.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBlogQuery } from '../implementations/getOneBlog.query';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service'
import { HttpException, HttpStatus } from '@nestjs/common';

@QueryHandler(GetOneBlogQuery)
export class GetOneBlogHandler implements IQueryHandler<GetOneBlogQuery> {

    constructor(
        @InjectRepository(Blogs)
        private blogsRepository: Repository<Blogs>,
        private keycloakProtectionService: KeycloakProtectionService,
    ) { }

    async execute(query: GetOneBlogQuery): Promise<Blogs> {
        console.log(query.ID, 'Query Id');
        const { username } = query

        this.keycloakProtectionService.getOne(query.ID)
        const usersRecordIds: string[] = await this.keycloakProtectionService.query({ owner: username });
        console.log(usersRecordIds, "RECORDS")

        // const result = await this.blogsRepository.find({ id: In(usersRecordIds) });
        const result = await this.blogsRepository.findOne({ where: { id: query.ID } });

        if (!result) {
            throw new HttpException('No Data Found', HttpStatus.NOT_FOUND)
        }

        console.log(usersRecordIds.includes(result.id.toString()))

        if (usersRecordIds.includes(result.id.toString())) {

            return result
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }

    }
}
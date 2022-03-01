import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBlogCommand } from '../implementation/updateBlog.command';
import { InjectRepository } from '@nestjs/typeorm';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service';

@CommandHandler(UpdateBlogCommand)
export class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
    constructor(
        @InjectRepository(Blogs)
        private blogRepository: Repository<Blogs>,
        private keycloakProtectionService: KeycloakProtectionService
    ) { }

    async execute(command: UpdateBlogCommand) {
        try {

            const { username, id, blog } = command;

            const usersRecordIds: string[] = await this.keycloakProtectionService.query({ owner: username });

            const data = await this.blogRepository.findOne({ id: Number(command.id) })

            if (!data) {
                throw new HttpException('Not data found', HttpStatus.NOT_FOUND)
            }
            // console.log(data, "BLOG DATA")

            // console.log(command.username, "USER_ID  ")

            if (usersRecordIds.includes(data.id.toString())) {
                await this.blogRepository.update(command.id, command.blog)
                await this.keycloakProtectionService.updateResource(command.id, { name: blog.name })
                return data
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
            }


        } catch (err) {
            console.log(err.message)
        }
    }
}
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../implementation/createBlog.command';
import { InjectRepository } from '@nestjs/typeorm';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { KeycloakProtectionService } from 'src/keycloak/keycloak-protection.service';

@CommandHandler(CreateBlogCommand)
export class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
    constructor(
        @InjectRepository(Blogs)
        private blogRepository: Repository<Blogs>,
        private keycloakProtectionService: KeycloakProtectionService
    ) { }

    async execute(command: CreateBlogCommand) {
        console.log(command, "Test  ")
        const newBlog = this.blogRepository.create({
            ...command.blog,
            id: command.blog.id,
            // user_id: command.user_id,
        });

        // if (!command.user_id) {
        //     throw new HttpException('NO User Found', HttpStatus.NOT_FOUND)
        // }

        console.log(command.user_id)
        await this.blogRepository.save(newBlog);

        // Tell Keycloak service to create a resourcw with that user id ==> in below code

        const resourceData = {
            name: command.blog.name,
            _id: command.blog.id,
            owner: {
                id: command.user_id,
            },
            ownerManagedAccess: true,
            resource_scopes: [
                "create",
                "view",
                "edit"
            ],
            scopes: ["create", "view", "edit"]
        }

        await this.keycloakProtectionService.createResource(resourceData)

        return newBlog;
    }
}
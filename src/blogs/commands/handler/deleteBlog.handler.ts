import { DeleteBlogCommand } from "../implementation/deleteBlog.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import Blogs from '../../blogs.entity'
import { HttpException, HttpStatus } from "@nestjs/common";
import { KeycloakProtectionService } from "../../../keycloak/keycloak-protection.service";

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogHandler implements ICommandHandler<DeleteBlogCommand>{
    constructor(
        @InjectRepository(Blogs)
        private blogRepository: Repository<Blogs>,
        private keycloakProtectionService: KeycloakProtectionService
    ) { }

    async execute(command: DeleteBlogCommand) {
        const { id, username } = command

        const usersRecordIds: string[] = await this.keycloakProtectionService.query({ owner: username });
        console.log(usersRecordIds, 'UsersRecordIds')


        const data = await this.blogRepository.findOne({ id: command.id })
        console.log(data, "DATA")

        if (!data) {
            throw new HttpException('No data found', HttpStatus.NOT_FOUND)
        }


        console.log(usersRecordIds.includes(data.id))


        if (usersRecordIds.includes(data.id)) {

            await this.blogRepository.delete(command.id)
            console.log('After deleting for Postgres');
            await this.keycloakProtectionService.deleteResource(command.id)
            return data
        } else {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }





        // if (!command.user_id) {
        //     throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        // }


        // if (data.user_id !== command.user_id) {
        //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        // }
        // return 'hello'
    }
}
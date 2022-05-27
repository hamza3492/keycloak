import { ICommandHandler } from '@nestjs/cqrs';
import { CreateBlogCommand } from '../implementation/createBlog.command';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
import { KeycloakProtectionService } from 'src/keycloak/keycloak-protection.service';
export declare class CreateBlogHandler implements ICommandHandler<CreateBlogCommand> {
    private blogRepository;
    private keycloakProtectionService;
    constructor(blogRepository: Repository<Blogs>, keycloakProtectionService: KeycloakProtectionService);
    execute(command: CreateBlogCommand): Promise<Blogs>;
}

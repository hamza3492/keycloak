import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateBlogCommand } from '../implementation/updateBlog.command';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service';
export declare class UpdateBlogHandler implements ICommandHandler<UpdateBlogCommand> {
    private blogRepository;
    private keycloakProtectionService;
    constructor(blogRepository: Repository<Blogs>, keycloakProtectionService: KeycloakProtectionService);
    execute(command: UpdateBlogCommand): Promise<import("typeorm").UpdateResult>;
}

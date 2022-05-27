import { DeleteBlogCommand } from "../implementation/deleteBlog.command";
import { ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import Blogs from '../../blogs.entity';
import { KeycloakProtectionService } from "../../../keycloak/keycloak-protection.service";
export declare class DeleteBlogHandler implements ICommandHandler<DeleteBlogCommand> {
    private blogRepository;
    private keycloakProtectionService;
    constructor(blogRepository: Repository<Blogs>, keycloakProtectionService: KeycloakProtectionService);
    execute(command: DeleteBlogCommand): Promise<Blogs>;
}

import Blogs from '../../blogs.entity';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetOneBlogQuery } from '../implementations/getOneBlog.query';
import { Repository } from 'typeorm';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service';
export declare class GetOneBlogHandler implements IQueryHandler<GetOneBlogQuery> {
    private blogsRepository;
    private keycloakProtectionService;
    constructor(blogsRepository: Repository<Blogs>, keycloakProtectionService: KeycloakProtectionService);
    execute(query: GetOneBlogQuery): Promise<Blogs>;
}

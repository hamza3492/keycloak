import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllBlogsQuery } from '../implementations/getBlogAll.query';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
import { KeycloakProtectionService } from '../../../keycloak/keycloak-protection.service';
export declare class GetBlogsHandler implements IQueryHandler<GetAllBlogsQuery> {
    private blogsRepository;
    private keycloakProtectionService;
    constructor(blogsRepository: Repository<Blogs>, keycloakProtectionService: KeycloakProtectionService);
    execute(query: GetAllBlogsQuery): Promise<any>;
}

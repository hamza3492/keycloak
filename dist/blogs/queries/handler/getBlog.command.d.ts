import { IQueryHandler } from '@nestjs/cqrs';
import { GetBlogsQuery } from '../implementations/getBlog.query';
import Blogs from '../../blogs.entity';
import { Repository } from 'typeorm';
export declare class GetBlogsHandler implements IQueryHandler<GetBlogsQuery> {
    private blogsRepository;
    constructor(blogsRepository: Repository<Blogs>);
    execute(query: GetBlogsQuery): Promise<Blogs[]>;
}

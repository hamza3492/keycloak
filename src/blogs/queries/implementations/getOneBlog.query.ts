import { IQuery } from '@nestjs/cqrs';

export class GetOneBlogQuery implements IQuery {
    constructor(
        public ID: string,
        public username: string,
    ) { }
}
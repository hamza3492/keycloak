import { IQuery } from '@nestjs/cqrs';

export class GetOneBlogQuery implements IQuery {
    constructor(
        public ID: number,
        public username: string,
    ) { }
}
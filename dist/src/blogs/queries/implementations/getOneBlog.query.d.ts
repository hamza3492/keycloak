import { IQuery } from '@nestjs/cqrs';
export declare class GetOneBlogQuery implements IQuery {
    ID: string;
    username: string;
    constructor(ID: string, username: string);
}

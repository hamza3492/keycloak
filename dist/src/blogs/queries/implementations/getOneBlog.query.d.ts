import { IQuery } from '@nestjs/cqrs';
export declare class GetOneBlogQuery implements IQuery {
    ID: number;
    username: string;
    constructor(ID: number, username: string);
}

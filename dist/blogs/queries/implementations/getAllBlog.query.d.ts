import { IQuery } from "@nestjs/cqrs";
export declare class GetAllBlogsQuery implements IQuery {
    username?: string;
    constructor(username?: string);
}

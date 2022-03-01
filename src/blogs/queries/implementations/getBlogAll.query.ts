// export class GetBlogsQuery {
//     constructor(
//         public readonly blogId?: number,
//         // public readonly user_id: any,
//     ) { }
// }
import { IQuery } from "@nestjs/cqrs";

export class GetAllBlogsQuery implements IQuery {
    constructor(
        public username?: string,
    ) { }
}
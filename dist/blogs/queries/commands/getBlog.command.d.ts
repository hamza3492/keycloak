import { ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../implementations/createComment.command';
import Comment from '../../comment.entity';
import { Repository } from 'typeorm';
export declare class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
    private commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    execute(command: CreateCommentCommand): Promise<Comment>;
}

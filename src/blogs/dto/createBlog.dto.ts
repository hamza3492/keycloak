import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import ObjectWithIdDTO from '../../utils/objectWithId.dto';

export class CreateBlogDto {
    id: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    name: string;

    @IsString()
    user_id: string;

    // @ValidateNested()
    // @Type(() => ObjectWithIdDTO)
    // blog: ObjectWithIdDTO;
}

export default CreateBlogDto;
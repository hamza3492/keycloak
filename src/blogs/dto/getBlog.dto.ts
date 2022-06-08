import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GetBlogDto {
    @Type(() => Number)
    @IsOptional()
    blogId?: string;
}

export default GetBlogDto
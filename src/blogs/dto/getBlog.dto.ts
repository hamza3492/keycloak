import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GetBlogDto {
    @Type(() => Number)
    @IsOptional()
    blogId?: number;
}

export default GetBlogDto
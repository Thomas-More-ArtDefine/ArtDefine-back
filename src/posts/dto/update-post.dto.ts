import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Folder } from 'src/folders/entities/folder.entity';
import { IsArray, IsObject, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    post_title:string;
    @IsString()
    post_description:string;
    @IsString()
    post_tags:string;

    @IsArray()
    folders: Folder[];
}

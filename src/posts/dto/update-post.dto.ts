import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { Folder } from 'src/folders/entities/folder.entity';
import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { visibility } from 'src/app.controller';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    post_title:string;
    @IsString()
    post_description:string;
    @IsString()
    post_tags:string;
    @IsEnum(visibility)
    post_visibility: visibility;

    @IsArray()
    folders: Folder[];
}

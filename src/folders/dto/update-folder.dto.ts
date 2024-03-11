import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderDto } from './create-folder.dto';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { visibility } from '../entities/folder.entity';
import { Post } from 'src/posts/entities/post.entity';

export class UpdateFolderDto extends PartialType(CreateFolderDto) {
    @IsString()
    folder_name: string;
    @IsString()
    folder_bio: string;
    @IsBoolean()
    folder_archived: boolean;
    @IsEnum(visibility)
    folder_visibility: visibility;
}

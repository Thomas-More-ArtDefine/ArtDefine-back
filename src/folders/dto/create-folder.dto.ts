import { IsEmpty, IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { visibility } from 'src/app.controller';
import { Post } from "src/posts/entities/post.entity";


export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    folder_name: string;
    @IsEnum(visibility)
    @IsNotEmpty()
    folder_visibility: visibility;

    @IsString()
    folder_description: string;

    @IsObject()
    user?: User;
    @IsObject()
    group?: Group;

    @IsEmpty()
    folder_order: number;
    @IsEmpty()
    folder_archived: boolean;
    @IsEmpty()
    posts: Post[];
}

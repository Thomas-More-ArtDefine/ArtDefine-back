import { User } from "src/users/entities/user.entity";
import { IsArray, IsEmpty, IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Folder, } from "src/folders/entities/folder.entity";
import { FeedbackTemplate } from "src/feedback_templates/entities/feedback_template.entity";
import { visibility } from 'src/app.controller';

// further validation to be added
export class CreatePostDto {
    @IsString()
    post_content:string;
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
    @IsObject()
    user:User;

    @IsObject()
    feedback_template: FeedbackTemplate;
}

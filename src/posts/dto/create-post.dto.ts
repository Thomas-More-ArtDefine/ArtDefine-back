import { User } from "src/users/entities/user.entity";
import { IsArray, IsEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Folder } from "src/folders/entities/folder.entity";
import { FeedbackTemplate } from "src/feedback_templates/entities/feedback_template.entity";

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
    
    @IsArray()
    folders: Folder[];
    @IsObject()
    user:User;

    @IsObject()
    feedback_template: FeedbackTemplate;
}

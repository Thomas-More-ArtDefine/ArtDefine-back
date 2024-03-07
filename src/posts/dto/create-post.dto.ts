import { User } from "src/users/entities/user.entity";
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

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
    

    user:User;
}

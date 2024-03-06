import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreatePostDto {
    post_content:string;
    post_title:string;
    post_description:string;
    post_tags:string;
    user:User;
}

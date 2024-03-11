import { IsArray, IsObject } from "class-validator";
import { Post } from "src/posts/entities/post.entity";

export class CreateFeedbackTemplateDto {
    @IsArray()
    questions: [];
    @IsObject()
    post: Post;
}

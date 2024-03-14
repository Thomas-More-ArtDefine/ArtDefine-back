import { IsArray, IsObject } from "class-validator";
import { FeedbackQuestion } from "src/feedback_questions/entities/feedback_question.entity";
import { Post } from "src/posts/entities/post.entity";

export class CreateFeedbackTemplateDto {
    @IsArray()
    questions: FeedbackQuestion[];
    @IsObject()
    post: Post;
}

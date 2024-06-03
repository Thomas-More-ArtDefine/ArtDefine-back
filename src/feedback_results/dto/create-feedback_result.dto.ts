import { IsJSON, IsObject } from "class-validator";
import { FeedbackQuestion } from "src/feedback_questions/entities/feedback_question.entity";

import { User } from "src/users/entities/user.entity";

export class CreateFeedbackResultDto {
    @IsJSON()
    feedback_result: JSON;
    @IsObject()
    user: User;
    @IsObject()
    question: FeedbackQuestion;
}

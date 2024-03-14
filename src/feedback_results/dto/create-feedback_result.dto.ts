import { IsJSON, IsObject } from "class-validator";
import { FeedbackTemplate } from "src/feedback_templates/entities/feedback_template.entity";
import { User } from "src/users/entities/user.entity";

export class CreateFeedbackResultDto {
    @IsJSON()
    feedback_result: JSON;
    @IsObject()
    user: User;
    @IsObject()
    template: FeedbackTemplate;
}

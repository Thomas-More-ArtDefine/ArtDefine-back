import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { questionType } from "../entities/feedback_question.entity";

export class CreateFeedbackQuestionDto {
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    question_title: string;

    @IsEnum(questionType)
    question_type: questionType;
}

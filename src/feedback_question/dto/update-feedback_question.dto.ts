import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackQuestionDto } from './create-feedback_question.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateFeedbackQuestionDto extends PartialType(CreateFeedbackQuestionDto) {
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    question_title: string;
}

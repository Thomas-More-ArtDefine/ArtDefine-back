import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackTemplateDto } from './create-feedback_template.dto';
import { IsArray } from 'class-validator';
import { FeedbackQuestion } from 'src/feedback_questions/entities/feedback_question.entity';

export class UpdateFeedbackTemplateDto extends PartialType(CreateFeedbackTemplateDto) {
    @IsArray()
    questions: FeedbackQuestion[];
}

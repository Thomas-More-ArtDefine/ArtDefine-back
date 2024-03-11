import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackTemplateDto } from './create-feedback_template.dto';
import { IsArray } from 'class-validator';

export class UpdateFeedbackTemplateDto extends PartialType(CreateFeedbackTemplateDto) {
    @IsArray()
    questions: [];
}

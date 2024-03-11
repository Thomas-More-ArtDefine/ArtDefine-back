import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackResultDto } from './create-feedback_result.dto';
import { IsJSON } from 'class-validator';

export class UpdateFeedbackResultDto extends PartialType(CreateFeedbackResultDto) {
    @IsJSON()
    feedback_result: JSON;
}

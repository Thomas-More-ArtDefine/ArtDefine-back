import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectmessageDto } from './create-directmessage.dto';

export class UpdateDirectmessageDto extends PartialType(CreateDirectmessageDto) {
    message_content:string;
}

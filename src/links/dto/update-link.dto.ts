import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkDto } from './create-link.dto';
import { IsString } from 'class-validator';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
    @IsString()
    link_name: string;

    @IsString()
    link_url: string;
}

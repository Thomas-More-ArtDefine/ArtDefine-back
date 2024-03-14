import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { Rule } from 'src/rules/entities/rule.entity';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
    @IsString()
    group_name:string;
    @IsString()
    group_userlimit:number;
    @IsString()
    group_bio: string;
    @IsString()
    group_profile_picture: string;
    @IsString()
    group_banner_picture: string;
    @IsBoolean()
    group_queued_deletion: boolean;
    @IsDate()
    group_queued_deletion_date: Date;
    @IsArray()
    Rules: Rule[];
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
    group_name:string;
    group_userlimit:number;
    group_bio: string;
    group_profile_picture: string;
    group_banner_picture: string;
    group_queued_deletion: boolean;
    group_queued_deletion_date: Date;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { Rule } from 'src/rules/entities/rule.entity';
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { GroupJoin, GroupVisibility } from '../entities/group.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Link } from 'src/links/entities/link.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';

export class UpdateGroupSettingsDto {
    @IsEnum(GroupVisibility)
    group_setting_visibility:GroupVisibility;

    @IsEnum(GroupJoin)
    group_setting_join:GroupJoin;

    @IsNumber()
    group_userlimit:number;

    @IsEmpty()
    id: string;
    @IsEmpty()
    creator_id:string;
    @IsEmpty()
    group_name:string;
    @IsEmpty()
    creator_name: string;
    @IsEmpty()
    group_creationdate: Date;
    @IsEmpty()
    group_bio: string;
    @IsEmpty()
    group_profile_picture: string;
    @IsEmpty()
    group_banner_picture: string;
    @IsEmpty()
    group_queued_deletion: boolean;
    @IsEmpty()
    group_queued_deletion_date: Date;
    @IsEmpty()
    members: GroupMember[];
    @IsEmpty()
    links: Link[];
    @IsEmpty()
    folders: Folder[];
    @IsEmpty()
    rules: Rule[];
    @IsEmpty()
    ranks: GroupRank[];
    
}
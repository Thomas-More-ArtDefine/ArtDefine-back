import { Rule } from 'src/rules/entities/rule.entity';
import { IsEmpty, IsString } from 'class-validator';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Link } from 'src/links/entities/link.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { GroupJoin, GroupVisibility } from '../entities/group.entity';

export class UpdateGroupDto {
    @IsString()
    group_name:string;
    @IsString()
    group_bio: string;
    @IsString()
    group_profile_picture: string;
    @IsString()
    group_banner_picture: string;
    

    @IsEmpty()
    id: string;
    @IsEmpty()
    creator_id:string;
    @IsEmpty()
    creator_name: string;
    @IsEmpty()
    group_creationdate: Date;
    @IsEmpty()
    group_queued_deletion: boolean;
    @IsEmpty()
    group_queued_deletion_date: Date;
    @IsEmpty()
    group_userlimit:number;
    @IsEmpty()
    group_setting_visibility:GroupVisibility;
    @IsEmpty()
    group_setting_join:GroupJoin;
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

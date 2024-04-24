import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsDate, IsEmpty } from "class-validator";
import { Folder } from "src/folders/entities/folder.entity";
import { GroupMember } from "src/group_members/entities/group_member.entity";
import { GroupRank } from "src/group_ranks/entities/group_rank.entity";
import { Link } from "src/links/entities/link.entity";
import { Rule } from "src/rules/entities/rule.entity";
import { GroupJoin, GroupVisibility } from "../entities/group.entity";

export class UpdateGroupDeletionDto {
    @IsBoolean()
    group_queued_deletion: boolean;

    @IsEmpty()
    group_queued_deletion_date: Date;

    @IsEmpty()
    id: string;
    @IsEmpty()
    creator_id:string;
    @IsEmpty()
    creator_name: string;
    @IsEmpty()
    group_creationdate: Date;
    @IsEmpty()
    group_name:string;
    @IsEmpty()
    group_userlimit:number;
    @IsEmpty()
    group_setting_visibility:GroupVisibility;
    @IsEmpty()
    group_setting_join:GroupJoin;
    @IsEmpty()
    group_bio: string;
    @IsEmpty()
    group_profile_picture: string;
    @IsEmpty()
    group_banner_picture: string;
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

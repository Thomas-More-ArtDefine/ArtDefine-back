import { GroupMember } from "src/group_member/entities/group_member.entity";
import { group_rank } from "../entities/group_rank.entity";
import { IsEnum, IsObject } from "class-validator";

export class CreateGroupRankDto {
    @IsObject()
    group_member: GroupMember;
    @IsEnum(group_rank)
    rank: group_rank;
}

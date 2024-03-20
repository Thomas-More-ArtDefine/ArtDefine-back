import { group_rank } from "../entities/group_rank.entity";
import { IsBoolean, IsEnum, IsObject } from "class-validator";
import { Group } from "src/groups/entities/group.entity";

export class CreateGroupRankDto {
    @IsObject()
    group: Group;
    @IsEnum(group_rank)
    rank: group_rank;
    @IsBoolean()
    default_rank: boolean;
}

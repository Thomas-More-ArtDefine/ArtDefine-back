import { IsObject } from "class-validator";
import { GroupRank } from "src/group_rank/entities/group_rank.entity";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreateGroupMemberDto {
    member: User;
    group: Group;
    @IsObject()
    rank: GroupRank;
}

import { IsEmpty, IsObject } from "class-validator";
import { GroupRank } from "src/group_ranks/entities/group_rank.entity";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreateGroupMemberDto {
    @IsObject()
    member: User;
    @IsObject()
    group: Group;
    @IsObject()
    rank: GroupRank;

    @IsEmpty()
    member_join_date: Date;
}

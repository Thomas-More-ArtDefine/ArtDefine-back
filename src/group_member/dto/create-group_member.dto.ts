import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreateGroupMemberDto {
    member: User;
    group: Group;
}

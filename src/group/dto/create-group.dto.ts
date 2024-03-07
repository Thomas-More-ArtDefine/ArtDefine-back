import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreateGroupDto {
    group_name:string;
    creator:User;
    group_userlimit:number;
}

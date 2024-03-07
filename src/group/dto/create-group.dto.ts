import { IsNumber, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

// further validation to be added
export class CreateGroupDto {
    @IsString()
    group_name:string;
    creator:User;
    @IsNumber()
    group_userlimit:number;
}

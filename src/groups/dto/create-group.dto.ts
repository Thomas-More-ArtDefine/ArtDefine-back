import { IsNumber, IsString } from "class-validator";

// further validation to be added
export class CreateGroupDto {
    @IsString()
    group_name:string;
    @IsString()
    creator_id:string;
    // creator:User;
    @IsNumber()
    group_userlimit:number;
}

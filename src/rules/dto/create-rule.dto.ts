import { IsBoolean, IsObject, IsString } from "class-validator";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

export class CreateRuleDto {
    @IsString()
    rule_name: string;
    @IsString()
    rule_value: string;
    @IsBoolean()
    is_active: boolean;
    @IsObject()
    group: Group;
    @IsObject()
    user: User; 
}

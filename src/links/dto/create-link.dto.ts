import { IsString } from "class-validator";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";

export class CreateLinkDto {
    user: User;
    group: Group;

    @IsString()
    link_name: string;

    @IsString()
    link_url: string;
}

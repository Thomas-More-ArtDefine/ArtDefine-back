import { IsEnum, IsString } from "class-validator";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { visibility } from "../entities/folder.entity";

export class CreateFolderDto {
    user: User;
    group: Group;
    @IsString()
    folder_name: string;
    @IsEnum(visibility)
    visibility: visibility;
}

import { IsEmpty, IsEnum, IsString } from "class-validator";
import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { visibility } from 'src/app.controller';


export class CreateFolderDto {
    user: User;
    group: Group;
    @IsString()
    folder_name: string;
    @IsEnum(visibility)
    folder_visibility: visibility;

    @IsEmpty()
    folder_order: number
}

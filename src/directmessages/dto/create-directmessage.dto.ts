import { IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

// further validation to be added
export class CreateDirectmessageDto {
    sender:User;
    receiver:User;
    @IsString()
    message_content:string;
}

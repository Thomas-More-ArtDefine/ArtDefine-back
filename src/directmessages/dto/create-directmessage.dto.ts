import { User } from "src/users/entities/user.entity";

// validation to be added
export class CreateDirectmessageDto {
    sender:User;
    receiver:User;
    message_content:string;
}

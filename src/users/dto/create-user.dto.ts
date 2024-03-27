import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsNotEmpty()
    @IsEmail()
    user_email: string;

    // further password validation to be added
    @IsNotEmpty()
    @IsString()
    user_password: string;

    @IsEmpty()
    user_bio: string;
    @IsEmpty()
    user_pronouns: string;
    @IsEmpty()
    user_subtitle: string;

    //Affected by other resources, should always be empty
    @IsEmpty()
    given_feedback: [];
    @IsEmpty()
    folders: [];
    @IsEmpty()
    links: [];
    @IsEmpty()
    received_messages: [];
    @IsEmpty()
    send_messages: [];
    @IsEmpty()
    groups: [];
    @IsEmpty()
    posts: []; 
}

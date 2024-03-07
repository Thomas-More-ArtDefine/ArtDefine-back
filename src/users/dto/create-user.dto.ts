import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsEmail()
    user_email: string;

    // further password validation to be added
    @IsString()
    user_password: string;

    @IsEmpty()
    user_bio: string;
    @IsEmpty()
    user_pronouns: string;
    @IsEmpty()
    user_subtitle: string;
}

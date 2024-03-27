import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { IsArray, IsBoolean, IsEmail, IsEmpty, IsObject, IsString } from 'class-validator';
import { Rule } from 'src/rules/entities/rule.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmpty()
    user_name: string;
    @IsEmpty()
    user_email: string;
    @IsEmpty()
    user_password: string;
    @IsEmpty()
    user_bio: string;
    @IsEmpty()
    user_profile_picture: string;
    @IsEmpty()
    user_banner_picture: string;
    @IsEmpty()
    user_pronouns: string;
    @IsEmpty()
    user_subtitle: string;
    @IsEmpty()
    Rules: Rule[];

    //Affected in this endpoint
    @IsObject()
    following: User[];

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

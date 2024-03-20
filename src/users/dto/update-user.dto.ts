import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { IsArray, IsBoolean, IsEmail, IsObject, IsString } from 'class-validator';
import { Rule } from 'src/rules/entities/rule.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    user_name: string;
    @IsEmail()
    user_email: string;
    @IsString()
    user_password: string;
    @IsString()
    user_bio: string;
    @IsString()
    user_profile_picture: string;
    @IsString()
    user_banner_picture: string;
    @IsString()
    user_pronouns: string;
    @IsString()
    user_subtitle: string;
    @IsObject()
    following: User[];
    @IsArray()
    Rules: Rule[];
    @IsBoolean()
    user_deactivated: boolean;
}

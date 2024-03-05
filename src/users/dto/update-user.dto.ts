import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    user_name: string;
    user_email: string;
    user_password: string;
    user_bio: string;
    user_profile_picture: string;
    user_banner_picture: string;
    user_pronouns: string;
    user_subtitle: string;
}

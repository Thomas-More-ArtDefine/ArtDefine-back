import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser: User = new User();
    newUser.user_name = createUserDto.user_name;
    newUser.user_email = createUserDto.user_email;
    newUser.user_password = createUserDto.user_password;
    newUser.user_creationdate = createUserDto.user_creationdate;
    this.usersRepository.save(newUser);
  }

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneUser(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    
    updateUser.user_name = updateUserDto.user_name;
    updateUser.user_email = updateUserDto.user_email;
    updateUser.user_password = updateUserDto.user_password;
    updateUser.user_bio = updateUserDto.user_bio;
    updateUser.user_profile_picture = updateUserDto.user_profile_picture;
    updateUser.user_banner_picture = updateUserDto.user_banner_picture;
    updateUser.user_subtitle = updateUserDto.user_subtitle;
    updateUser.user_pronouns = updateUserDto.user_pronouns;

    this.usersRepository.save(updateUser);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Directmessage } from 'src/directmessages/entities/directmessage.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.usersRepository.save(createUserDto);
    return createUserDto;
  }

  async findAllUsers(): Promise<User[]> {
    return getBasicUserInfoArray(await this.usersRepository.find());
  }

  async findAllFollowing(id: string) {
    const user: User = await this.usersRepository.findOne({
      relations: {
        following: true,
      },
      where: {
        id: id,
    }
  });
  let following: User[] = [];

  following = getBasicUserInfoArray(user.following);

    return following;
  }

  async findAllFollowers(id: string) {
    const users: User[] = await this.usersRepository.find({
      where: {
        following: {id: id},
    }
    });

    let followers: User[] = getBasicUserInfoArray(users);

    return followers;
  }

  async findOneUser(id: string): Promise<User | null> {
    return getProfileUserInfo(
      await this.usersRepository.findOne({
        relations: {
          links: true,
        },
        where: {
          id: id,
      }
    })
    );
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
    updateUser.following = updateUserDto.following;

    this.usersRepository.save(updateUser);
    return updateUser;
  }

  async deactivateUser(id: string){
    let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    if (updateUser.user_deactivated != true) {
      updateUser.user_deactivated = true;
      updateUser.user_deactivation_date = new Date();
      return this.usersRepository.save(updateUser);
    }else{
      return "User [" + id + "] is already deactivated.";
    }
  }

  async activateUser(id: string){
    let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    if (updateUser.user_deactivated != true) {
      return "User [" + id + "] is already active.";
    }else{
      updateUser.user_deactivated = false;
      updateUser.user_deactivation_date = null;
      return this.usersRepository.save(updateUser);
    }
  }

  async saveProfilePicture(file: Express.Multer.File,id: string) {
    let user: User = await this.usersRepository.findOneBy({ id }); 
    user.user_profile_picture = "[replace with cloud url or local path]/"+file.originalname;

    return this.usersRepository.save(user);
  }

  async removeUser(id: string) {
    let deleteUser: User = await this.usersRepository.findOne({
      relations: {
        received_messages: true,
        send_messages: true,
      },
      where: {
        id: id,
    }
  }); 

  deleteUser.received_messages = [];
  deleteUser.send_messages = [];

  await this.usersRepository.save(deleteUser);

    return await this.usersRepository.delete(id);;
  }
}

function getBasicUserInfoArray(array:User[]) {
    const cleanedArray: User[] = [];
    array.forEach( function (user){
      let cleanedUser: User = getBasicUserInfo(user);
  
      cleanedArray.push(cleanedUser);
    })
    return cleanedArray;
  }

function getBasicUserInfo(user:User):User{
    const cleanedUser: User = new User();
    cleanedUser.id = user.id;
    cleanedUser.user_name = user.user_name;
    cleanedUser.user_subtitle = user.user_subtitle;
    cleanedUser.user_profile_picture = user.user_profile_picture;
    cleanedUser.user_deactivated = user.user_deactivated;
    cleanedUser.user_deactivation_date = user.user_deactivation_date;
    return cleanedUser;
  }

  function getProfileUserInfo(user:User){
    const cleanedUser: User = new User();
    cleanedUser.id = user.id;
    cleanedUser.user_name = user.user_name;
    cleanedUser.user_subtitle = user.user_subtitle;
    cleanedUser.user_pronouns = user.user_pronouns;
    cleanedUser.user_bio = user.user_bio;
    cleanedUser.user_profile_picture = user.user_profile_picture;
    cleanedUser.user_banner_picture = user.user_banner_picture;
    cleanedUser.user_creationdate = user.user_creationdate;
    cleanedUser.links = user.links;
    cleanedUser.user_deactivated = user.user_deactivated;
    cleanedUser.user_deactivation_date = user.user_deactivation_date;
    return cleanedUser;
  }


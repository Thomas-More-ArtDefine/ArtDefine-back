import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { FoldersService } from 'src/folders/folders.service';
import { CreateFolderDto } from 'src/folders/dto/create-folder.dto';
import { visibility } from 'src/app.controller';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly foldersService: FoldersService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const savedUser: User = await this.usersRepository.save(createUserDto);

    // make general folder
    let createFolderDto: CreateFolderDto = new CreateFolderDto();
    createFolderDto.folder_name = "General";
    createFolderDto.user =  savedUser;
    createFolderDto.folder_visibility = visibility.PRIVATE;
    await this.foldersService.createFolder(createFolderDto);
    
    return savedUser;
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

  async findAllGroups(id: string) {
    const user: User = await this.usersRepository.findOne({
      where:{
        id: id
      },
      join: {
        alias: "user",
        leftJoinAndSelect: {
            "joinedGroups": "user.groups",
            "group": "joinedGroups.group",
            "group_members": "group.members"
        }
      }
    });

    

    return getBasicUserGroupInfo(user.groups);
    //return user.groups;
  }


  // async updateUser(id: string, updateUserDto: UpdateUserDto) {
  //   let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    
  //   updateUser.user_name = updateUserDto.user_name;
  //   updateUser.user_email = updateUserDto.user_email;
  //   updateUser.user_password = updateUserDto.user_password;
  //   updateUser.user_bio = updateUserDto.user_bio;
  //   updateUser.user_profile_picture = updateUserDto.user_profile_picture;
  //   updateUser.user_banner_picture = updateUserDto.user_banner_picture;
  //   updateUser.user_subtitle = updateUserDto.user_subtitle;
  //   updateUser.user_pronouns = updateUserDto.user_pronouns;
  //   updateUser.following = updateUserDto.following;

  //   this.usersRepository.save(updateUser);
  //   return updateUser;
  // }

  async updateFollowing(id: string, updateUserDto: UpdateUserDto) {
    let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    
    updateUser.following = updateUserDto.following;

    this.usersRepository.save(updateUser);
    return getBasicUserInfo(updateUser);
  }

  async updateGeneralInfo(id: string, updateGeneralInfoDto: UpdateGeneralInfoDto) {
    let updateUser: User = await this.usersRepository.findOneBy({ id }); 
    
    updateUser.user_bio = updateGeneralInfoDto.user_bio;
    updateUser.user_subtitle = updateGeneralInfoDto.user_subtitle;
    updateUser.user_pronouns = updateGeneralInfoDto.user_pronouns;

    this.usersRepository.save(updateUser);
    return getBasicUserInfo(updateUser);
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

  async saveProfileImages(files: { profile_picture?: Express.Multer.File[], banner_picture?: Express.Multer.File[] },id: string) {
    let user: User = await this.usersRepository.findOneBy({ id }); 
    if (files.profile_picture != undefined) {
      user.user_profile_picture = "[replace with cloud url or local path]/"+files.profile_picture[0].originalname;
    }
    if (files.banner_picture != undefined) {
      user.user_banner_picture = "[replace with cloud url or local path]/"+files.banner_picture[0].originalname;
    }
    
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

  function getBasicUserGroupInfo(groups:GroupMember[]){
    // let array: GroupMember[] = [];
    let array: Group[] = [];
    groups.forEach( (group) => {
      // const cleanedGroupMember: GroupMember = new GroupMember();
      // cleanedGroupMember.id = group.id;
      // cleanedGroupMember.member_join_date = group.member_join_date;
      // cleanedGroupMember.grouprank_id = group.grouprank_id;
      // cleanedGroupMember.group_id = group.group_id;

      const cleanedGroup: Group = getBasicGroupInfo(group.group);

      // cleanedGroupMember.group = cleanedGroup;
      array.push(cleanedGroup);
    })
    
    
    return array;
  }

  function getBasicGroupInfo(group:Group):Group{
    const cleanedGroup: Group = new Group();
    cleanedGroup.id = group.id;
    cleanedGroup.group_name = group.group_name;
    cleanedGroup.group_profile_picture = group.group_profile_picture;
    cleanedGroup.group_userlimit = group.group_userlimit;
    cleanedGroup.group_bio = group.group_bio;
    cleanedGroup.group_setting_visibility = group.group_setting_visibility;
    cleanedGroup.group_setting_join = group.group_setting_join;
    // used for membercount in groupcards
    if (group.members !== undefined && group.members !== null) {
      group.members.forEach((member) => {
        member.member_id = undefined;
        member.grouprank_id = undefined;
        member.member_join_date = undefined;
        member.id = undefined;
      })
      cleanedGroup.members = group.members;
    }
    return cleanedGroup;
  }


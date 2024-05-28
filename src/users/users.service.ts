import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * @async
   * @param createUserDto
   * @returns User
   * @throws {Error}
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      const savedUser: User = await this.usersRepository.save(createUserDto);

      // make general folder
      let createFolderDto: CreateFolderDto = new CreateFolderDto();
      createFolderDto.folder_name = 'General';
      createFolderDto.user = savedUser;
      createFolderDto.folder_visibility = visibility.PRIVATE;
      await this.foldersService.createFolder(createFolderDto);

      return savedUser;
    } catch (err) {
      throw new Error('Something went wrong');
    }
  }

  /**
   * @async
   * @returns Promise<User[]>
   * @throws {NotFoundException}
   */
  async findAllUsers(): Promise<User[]> {
    try {
      return getBasicUserInfoArray(await this.usersRepository.find());
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<User[]>
   * @throws {Error | NotFoundException}
   */
  async findAllFollowing(id: string): Promise<User[]> {
    try {
      const user: User = await this.usersRepository.findOne({
        relations: {
          following: true,
        },
        where: {
          id: id,
        },
      });

      if (user === undefined || user === null) {
        throw new NotFoundException('User not found');
      }

      let following: User[] = [];

      following = getBasicUserInfoArray(user.following);

      return following;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<User[]>
   * @throws {NotFoundException}
   */
  async findAllFollowers(id: string): Promise<User[]> {
    try {
      const users: User[] = await this.usersRepository.find({
        where: {
          following: { id: id },
        },
      });

      if (users === undefined || users === null) {
        throw new NotFoundException('User not found');
      }

      let followers: User[] = getBasicUserInfoArray(users);

      return followers;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param id
   * @returns User | null
   * @throws {Error | NotFoundException}
   */
  async findOneUser(id: string): Promise<User | null> {
    try {
      return getProfileUserInfo(
        await this.usersRepository.findOne({
          relations: {
            links: true,
            folders: true,
          },
          where: {
            id: id,
          },
        }),
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param id
   * @returns User | null
   * @throws {Error | NotFoundException}
   */
  async findOneBasicUser(id: string): Promise<User | null> {
    try {
      return getBasicUserInfo(
        await this.usersRepository.findOne({
          relations: {
            links: true,
          },
          where: {
            id: id,
          },
        }),
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param id
   * @returns User | null
   * @throws {Error | NotFoundException}
   */
  async findAllGroups(id: string) {
    try {
      const user: User = await this.usersRepository.findOne({
        where: {
          id: id,
        },
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            joinedGroups: 'user.groups',
            group: 'joinedGroups.group',
            group_members: 'group.members',
          },
        },
      });

      if (user === undefined || user === null) {
        throw new NotFoundException('User not found');
      }

      if (user.groups === undefined || user.groups === null) {
        return [];
      }
      return getBasicUserGroupInfo(user.groups);
    } catch (err) {
      throw err;
    }
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

  /**
   * @async
   * @param id
   * @param updateUserDto
   * @returns Promise<User>
   * @throws {Error}
   */
  async updateFollowing(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      let updateUser: User = await this.usersRepository.findOneBy({ id });

      updateUser.following = updateUserDto.following;

      this.usersRepository.save(updateUser);
      return getBasicUserInfo(updateUser);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @async
   * @param id
   * @param updateGeneralInfoDto
   * @returns Promise<User>
   * @throws {Error | NotFoundException}
   */
  async updateGeneralInfo(
    id: string,
    updateGeneralInfoDto: UpdateGeneralInfoDto,
  ) {
    try {
      let updateUser: User = await this.usersRepository.findOneBy({ id });
      if (updateUser === undefined || updateUser === null) {
        throw new NotFoundException('User not found');
      }

      updateUser.user_bio = updateGeneralInfoDto.user_bio;
      updateUser.user_subtitle = updateGeneralInfoDto.user_subtitle;
      updateUser.user_pronouns = updateGeneralInfoDto.user_pronouns;

      this.usersRepository.save(updateUser);
      return getBasicUserInfo(updateUser);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        throw new Error('Something went wrong saving the user info.');
      }
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<User | string>
   * @throws {Error | NotFoundException}
   */
  async deactivateUser(id: string): Promise<User | string> {
    try {
      let updateUser: User = await this.usersRepository.findOneBy({ id });
      if (updateUser.user_deactivated != true) {
        updateUser.user_deactivated = true;
        updateUser.user_deactivation_date = new Date();
        return this.usersRepository.save(updateUser);
      } else {
        return 'User [' + id + '] is already deactivated.';
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @param id
   * @returns Promise<User | string>
   * @throws {Error | NotFoundException}
   */
  async activateUser(id: string) {
    let updateUser: User = await this.usersRepository.findOneBy({ id });
    if (updateUser.user_deactivated != true) {
      return 'User [' + id + '] is already active.';
    } else {
      updateUser.user_deactivated = false;
      updateUser.user_deactivation_date = null;
      return this.usersRepository.save(updateUser);
    }
  }

  /**
   * @async
   * @param files
   * @param id
   * @returns Promise<User>
   * @throws {Error | NotFoundException}
   */
  async saveProfileImages(
    files: {
      profile_picture?: Express.Multer.File[];
      banner_picture?: Express.Multer.File[];
    },
    id: string,
  ) {
    try {
      let user: User = await this.usersRepository.findOneBy({ id });
      if (files.profile_picture != undefined) {
        user.user_profile_picture =
          '[replace with cloud url or local path]/' +
          files.profile_picture[0].originalname;
      }
      if (files.banner_picture != undefined) {
        user.user_banner_picture =
          '[replace with cloud url or local path]/' +
          files.banner_picture[0].originalname;
      }

      return this.usersRepository.save(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @async
   * @param string
   * @returns {Promise<User>}
   * @throws {Error | NotFoundException}
   */
  async removeUser(id: string) {
    try {
      let deleteUser: User = await this.usersRepository.findOne({
        relations: {
          received_messages: true,
          send_messages: true,
        },
        where: {
          id: id,
        },
      });

      if (deleteUser === undefined || deleteUser === null) {
        throw new NotFoundException('User not found to delete');
      }

      deleteUser.received_messages = [];
      deleteUser.send_messages = [];

      await this.usersRepository.save(deleteUser);

      return await this.usersRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}

/**
 *
 * @param array
 * @returns User[]
 * @throws {NotFoundException}
 */
function getBasicUserInfoArray(array: User[]) {
  try {
    const cleanedArray: User[] = [];
    array.forEach(function (user) {
      let cleanedUser: User = getBasicUserInfo(user);

      cleanedArray.push(cleanedUser);
    });
    return cleanedArray;
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param user
 * @returns User
 * @throws {NotFoundException}
 */
function getBasicUserInfo(user: User): User {
  if (user === undefined || user === null) {
    throw new NotFoundException('User not found');
  }
  const cleanedUser: User = new User();
  cleanedUser.id = user.id;
  cleanedUser.user_name = user.user_name;
  cleanedUser.user_subtitle = user.user_subtitle;
  cleanedUser.user_profile_picture = user.user_profile_picture;
  cleanedUser.user_deactivated = user.user_deactivated;
  cleanedUser.user_deactivation_date = user.user_deactivation_date;
  return cleanedUser;
}

/**
 *
 * @param {user} : User
 * @returns
 * @throws {Error}
 */
function getProfileUserInfo(user: User) {
  try {
    if (!user) {
      throw new NotFoundException('User not found.');
    }
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
    cleanedUser.folders = user.folders;
    return cleanedUser;
  } catch (error) {
    throw error;
  }
}

function getBasicUserGroupInfo(groups: GroupMember[]): Group[] {
  try {
    let array: Group[] = [];
    groups.forEach((group) => {
      const cleanedGroup: Group = getBasicGroupInfo(group.group);
      array.push(cleanedGroup);
    });

    return array;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 *
 * @param group
 * @returns Group
 * @throws {Error}
 */
function getBasicGroupInfo(group: Group): Group {
  if (group === undefined || group === null) {
    throw new Error('Group is null or undefined');
  }
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
    });
    cleanedGroup.members = group.members;
  }
  return cleanedGroup;
}

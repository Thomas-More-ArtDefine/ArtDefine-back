import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, GroupJoin, GroupVisibility } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/users/entities/user.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { UsersService } from 'src/users/users.service';
import { GroupMembersService } from 'src/group_members/group_members.service';
import { CreateGroupMemberDto } from 'src/group_members/dto/create-group_member.dto';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { CreateGroupRankDto } from 'src/group_ranks/dto/create-group_rank.dto';
import {
  GroupRank,
  group_rank,
} from 'src/group_ranks/entities/group_rank.entity';
import { orderBy, visibility } from 'src/app.controller';
import { ILike } from 'typeorm';
import { UpdateGroupSettingsDto } from './dto/update-group-settings.dto';
import { UpdateGroupDeletionDto } from './dto/update-group-deletion.dto';
import { CreateFolderDto } from 'src/folders/dto/create-folder.dto';
import { FoldersService } from 'src/folders/folders.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
    private readonly groupMembersService: GroupMembersService,
    private readonly groupranksService: GroupRanksService,
    private readonly foldersService: FoldersService,
  ) {
    this.removeQueuedGroups();
  }

  /**
   * @async
   * @param createGroupDto - CreateGroupDto
   * @returns Promise<Group>
   * @throws {Error | NotAcceptableException}
   */
  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      if (!createGroupDto) {
        throw new NotAcceptableException('Group data is required');
      }
      if (!createGroupDto.creator_id) {
        throw new NotAcceptableException('Creator ID is required');
      }
      if (createGroupDto.group_userlimit === undefined) {
        createGroupDto.group_userlimit = 100;
      }
      if (createGroupDto.group_setting_join === undefined) {
        createGroupDto.group_setting_join = GroupJoin.OPEN;
      }
      if (createGroupDto.group_setting_visibility === undefined) {
        createGroupDto.group_setting_visibility = GroupVisibility.PUBLIC;
      }

      const creator: User = await this.usersService.findOneUser(
        createGroupDto.creator_id,
      );
      createGroupDto.creator_name = creator.user_name;

      let savedGroup: Group = await this.groupsRepository.save(createGroupDto);

      // make default group ranks: Owner, Member
      let createDefaultRankDto: CreateGroupRankDto = new CreateGroupRankDto();
      createDefaultRankDto.default_rank = true;
      createDefaultRankDto.group = savedGroup;
      createDefaultRankDto.rank = group_rank.MEMBER;
      await this.groupranksService.createMemberRank(createDefaultRankDto);

      let createOwnerRankDto: CreateGroupRankDto = new CreateGroupRankDto();
      createOwnerRankDto.default_rank = false;
      createOwnerRankDto.group = savedGroup;
      createOwnerRankDto.rank = group_rank.OWNER;
      const ownerRank: Promise<GroupRank> =
        this.groupranksService.createMemberRank(createOwnerRankDto);

      // make owner group member
      let createGroupMemberDto: CreateGroupMemberDto =
        new CreateGroupMemberDto();
      createGroupMemberDto.member = creator;
      createGroupMemberDto.group = savedGroup;
      createGroupMemberDto.rank = await ownerRank;
      await this.groupMembersService.createGroupOwner(createGroupMemberDto);

      // make general folder
      let createFolderDto: CreateFolderDto = new CreateFolderDto();
      createFolderDto.folder_name = 'General';
      createFolderDto.group = savedGroup;
      createFolderDto.folder_visibility =
        savedGroup.group_setting_visibility == GroupVisibility.PUBLIC
          ? visibility.PUBLIC
          : visibility.PRIVATE;
      await this.foldersService.createFolder(createFolderDto);
      return savedGroup;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'Error creating group : ' + error.message,
        );
      }
      throw new Error('Error creating group: ' + error);
    }
  }

  /**
   * @async
   * @returns Promise<Group[]>
   * @throws {Error | NotAcceptableException}
   */
  async findAllGroups(): Promise<Group[]> {
    try {
      return getBasicGroupInfoArray(
        await this.groupsRepository.find({
          relations: {
            members: true,
          },
        }),
      );
    } catch (error) {
      throw new Error('Error finding all groups: ' + error);
    }
  }

  async findOneGroup(id: string): Promise<Group> {
    try {
      let group: Group = await this.groupsRepository.findOne({
        relations: {
          links: true,
          folders: true,
        },
        where: {
          id: id,
        },
        join: {
          alias: 'group',
          leftJoinAndSelect: {
            members: 'group.members',
            member: 'members.member',
          },
        },
      });

      if (!group) {
        throw new NotFoundException('Group not found');
      }

      group.members.forEach(function (group_member: GroupMember) {
        group_member.member = getBasicUserInfo(group_member.member);
      });
      return group;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Error finding group by ID: ' + error);
      }
      throw new Error('Error finding group by ID: ' + error);
    }
  }

  /**
   * @async
   * @param name - string
   * @param amount - number
   * @param orderby - string
   * @param skipAmount - number
   * @returns Promise<[Group[], number]>
   * @throws {Error | NotAcceptableException}
   */
  async findGroupsByName(
    name: string,
    amount: number,
    orderby: string,
    skipAmount: number,
  ) : Promise<[Group[], number]>{
    try {
    const str = name.replace(/[^a-zA-Z ]/g, '');
    let filter: orderBy = orderBy.DESC;

    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: { group_name: ILike('%' + str + '%') },
      take: amount,
      skip: skipAmount,
      order: {
        group_name: filter,
      },
      relations: {
        members: true,
      },
    });
    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }
    return data;
  }catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error finding group by name: ' + error);
    }
    throw new Error('Error finding group by name: ' + error);
  }}


  /**
   * @async
   * @param join - GroupJoin
   * @param amount - number
   * @param orderby - string
   * @param skipAmount - number
   * @returns Promise<[Group[], number]>
   * @throws {Error | NotAcceptableException}
   */
  async findGroupsByJoinMethod(
    join: GroupJoin,
    amount: number,
    orderby: string,
    skipAmount: number,
  ) : Promise<[Group[], number]>{
    try{
    let filter: orderBy = orderBy.DESC;
    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: { group_setting_join: join },
      take: amount,
      skip: skipAmount,
      order: {
        group_name: filter,
      },
      relations: {
        members: true,
      },
    });
    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }
    return data;
  }catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error finding group by join method: ' + error);
    }
    throw new Error('Error finding group by join method: ' + error);
  }}


  /**
   * @async
   * @param groupvisibility - GroupVisibility
   * @param amount - number
   * @param orderby - string
   * @param skipAmount - number
   * @returns Promise<[Group[], number]>
   * @throws {Error | NotAcceptableException}
   */
  async findGroupsByVisibility(
    groupvisibility: GroupVisibility,
    amount: number,
    orderby: string,
    skipAmount: number,
  ) : Promise<[Group[], number]>{
    try{
    let filter: orderBy = orderBy.DESC;
    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: { group_setting_visibility: groupvisibility },
      take: amount,
      skip: skipAmount,
      order: {
        group_name: filter,
      },
      relations: {
        members: true,
      },
    });

    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }

    return data;
  }catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error finding group by visibility: ' + error);
    }
    throw new Error('Error finding group by visibility: ' + error);
  }} 


  /**
   * @async
   * @param id - string
   * @returns Promise<Group>
   * @throws {Error | NotFoundException | NotAcceptableException}
   */
  async getGroupMembers(id: string) : Promise<Group>{
    try{
    const group: Group = await this.groupsRepository.findOne({
      where: {
        id: id,
      },
      join: {
        alias: 'group',
        leftJoinAndSelect: {
          members: 'group.members',
          member: 'members.member',
        },
      },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    group.members.forEach(function (group_member: GroupMember) {
      group_member.member = getBasicUserInfo(group_member.member);
    });

    return group;
  }catch (error) {
    if (error instanceof NotFoundException){
      throw new NotFoundException('Error getting group members: ' + error.message);
    }else if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error getting group members: ' + error.message);
    }
    throw new Error('Error getting group members: ' + error);
  }}


  /**
   * @async
   * @param id - string
   * @param updateGroupDto - UpdateGroupDto
   * @returns Promise<Group>
   * @throws {Error | NotFoundException}
   */
  async updateGroupGeneral(id: string, updateGroupDto: UpdateGroupDto) : Promise<Group>{
    try{
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    if (!updateGroup) {
      throw new NotFoundException('Group not found');
    }
    updateGroup.group_name = updateGroupDto.group_name;
    updateGroup.group_bio = updateGroupDto.group_bio;
    updateGroup.group_profile_picture = updateGroupDto.group_profile_picture;
    updateGroup.group_banner_picture = updateGroupDto.group_banner_picture;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }catch (error) {
    if (error instanceof NotFoundException){
      throw new NotFoundException('Error updating group general: ' + error.message);
    }
    throw new Error('Error updating group general: ' + error);
  }}


  /**
   * @async
   * @param id - string
   * @param updateGroupSettingsDto - UpdateGroupSettingsDto
   * @returns Promise<Group>
   * @throws {Error | NotFoundException}
   */
  async updateGroupSettings(
    id: string,
    updateGroupSettingsDto: UpdateGroupSettingsDto,
  ) : Promise<Group> {
    try{
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });
    if (!updateGroup) {
      throw new NotFoundException('Group not found');
    }
    updateGroup.group_userlimit = updateGroupSettingsDto.group_userlimit;
    updateGroup.group_setting_join = updateGroupSettingsDto.group_setting_join;
    updateGroup.group_setting_visibility =
      updateGroupSettingsDto.group_setting_visibility;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }catch (error) {
    if (error instanceof NotFoundException){
      throw new NotFoundException('Error updating group settings: ' + error.message);
    }
    throw new Error('Error updating group settings: ' + error);
  }}

  /**
   * @async
   * @param id - string
   * @param updateGroupDeletionDto - UpdateGroupDeletionDto
   * @returns Promise<Group>
   * @throws {Error | NotFoundException}
   */
  async updateGroupDeletion(
    id: string,
    updateGroupDeletionDto: UpdateGroupDeletionDto,
  ) : Promise<Group> {
    try{
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });
    if (!updateGroup) {
      throw new NotFoundException('Group not found');
    }
    if (
      updateGroup.group_queued_deletion === false &&
      updateGroupDeletionDto.group_queued_deletion === true
    ) {
      updateGroup.group_queued_deletion_date = new Date();
    } else if (
      updateGroup.group_queued_deletion === true &&
      updateGroupDeletionDto.group_queued_deletion === false
    ) {
      updateGroup.group_queued_deletion_date = null;
    }

    updateGroup.group_queued_deletion =
      updateGroupDeletionDto.group_queued_deletion;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }catch (error) {
    if (error instanceof NotFoundException){
      throw new NotFoundException('Error updating group deletion: ' + error.message);
    }
    throw new Error('Error updating group deletion: ' + error);
  }}

  // function that removes a group 7 days after the deletion queue initiation
  // should only run at server refresh (during lowest traffic hours)

  /**
   * @async
   * @returns Promise<void>
   * @throws {Error | NotFoundException}
   */
  async removeQueuedGroups() : Promise<void>{
    try{
    const groups: Group[] = await this.groupsRepository.find({
      where: {
        group_queued_deletion: true,
      },
    });
    if (!groups) {
      throw new NotFoundException('No queued groups found');
    }
    const today: Date = new Date();

    groups.forEach(function (group) {
      if (
        group.group_queued_deletion === true &&
        group.group_queued_deletion_date.getDate() <= today.getDate() - 7
      ) {
        this.removeGroup(group.id);
      }
    });
  }catch (error) {
    if (error instanceof NotFoundException){
      throw new NotFoundException('Error removing queued groups: ' + error.message);
    }
    throw new Error('Error removing queued groups: ' + error);
  }}


  /**
   * @async
   * @param id - string
   * @returns Promise<DeleteResult>
   * @throws {Error}
   */
  async removeGroup(id: string) {
    try {
    return await this.groupsRepository.delete(id);
  }catch (error) {
    throw new Error('Error removing group: ' + error);
  }}
}

/**
 *
 * @param group - Group
 * @returns Group
 * @throws {Error | NotAcceptableException}
 */
function getBasicGroupInfo(group: Group): Group {
  try {
    if (!group) {
      throw new NotAcceptableException('Group is empty');
    }
    if (!group.id || group.id === '') {
      throw new NotAcceptableException('Group is missing ID');
    }
    if (!group.group_name || group.group_name === '') {
      throw new NotAcceptableException('Group is missing group name');
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
  } catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error getting basic group info: ' + error);
    }
    throw new Error('Error getting basic group info: ' + error);
  }
}

/**
 *
 * @param array - Group[]
 * @returns Group[]
 * @throws {Error | NotAcceptableException}
 */
function getBasicGroupInfoArray(array: Group[]) {
  try{
  const cleanedArray: Group[] = [];
  array.forEach(function (group) {
    let cleanedGroup: Group = getBasicGroupInfo(group);
    cleanedArray.push(cleanedGroup);
  });
  return cleanedArray;
  }catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error getting basic group info array: ' + error);
    }
    throw new Error('Error getting basic group info array: ' + error);
  }

}

/**
 *
 * @param user - User
 * @returns User
 * @throws {Error | NotAcceptableException}
 */
function getBasicUserInfo(user: User): User {
  try {
    if (!user) {
      throw new NotAcceptableException('User is empty');
    }
    if (!user.id || user.id === '') {
      throw new NotAcceptableException('User is missing ID');
    }
    if (!user.user_name || user.user_name === '') {
      throw new NotAcceptableException('User is missing user name');
    }
    const cleanedUser: User = new User();
    cleanedUser.id = user.id;
    cleanedUser.user_name = user.user_name;
    cleanedUser.user_subtitle = user.user_subtitle;
    cleanedUser.user_profile_picture = user.user_profile_picture;
    return cleanedUser;
  } catch (error) {
    if (error instanceof NotAcceptableException){
      throw new NotAcceptableException('Error getting basic user info: ' + error);
    }
    throw new Error('Error getting basic user info: ' + error);
  }
}

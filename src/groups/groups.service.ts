import { Injectable } from '@nestjs/common';
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
import { GroupRank, group_rank } from 'src/group_ranks/entities/group_rank.entity';
import { orderBy, visibility } from 'src/app.controller';
import { Like } from 'typeorm';
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

  async createGroup(createGroupDto: CreateGroupDto) {
    const creator: User = await this.usersService.findOneUser(createGroupDto.creator_id);
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
    const ownerRank: Promise<GroupRank> = this.groupranksService.createMemberRank(createOwnerRankDto);

    // make owner group member
    let createGroupMemberDto: CreateGroupMemberDto = new CreateGroupMemberDto();
    createGroupMemberDto.member = creator;
    createGroupMemberDto.group = savedGroup;
    createGroupMemberDto.rank = await ownerRank;
    await this.groupMembersService.createGroupOwner(createGroupMemberDto);

    // make general folder
    let createFolderDto: CreateFolderDto = new CreateFolderDto();
    createFolderDto.folder_name = "General";
    createFolderDto.group = savedGroup;
    createFolderDto.folder_visibility = (savedGroup.group_setting_visibility == GroupVisibility.PUBLIC) ? visibility.PUBLIC : visibility.PRIVATE;
    await this.foldersService.createFolder(createFolderDto);
    return savedGroup; 
  }

  async findAllGroups() {
    return getBasicGroupInfoArray(await this.groupsRepository.find({
      relations:{
        members: true
      }
    }));
  }

  async findOneGroup(id: string) {
    let group: Group = await this.groupsRepository.findOne({
      relations: {
        links: true,
        members: true
      },
      where: {
        id: id,
      }
    });
    return group;
  }

  async findGroupsByName(name: string, amount:number, orderby:string, skipAmount:number) {
    const str = name.replace(/[^a-zA-Z ]/g, "");
    let filter: orderBy = orderBy.DESC;

    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: {group_name: Like('%'+str+'%')},
      take: amount,
      skip:skipAmount,
      order: {
        group_name: filter
      },
      relations:{
        members: true
      }
    })
    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }
    return data;
  }

  async findGroupsByJoinMethod(join: GroupJoin, amount:number, orderby:string, skipAmount:number) {
    let filter: orderBy = orderBy.DESC;
    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: {group_setting_join: join},
      take: amount,
      skip:skipAmount,
      order: {
        group_name: filter
      },
      relations:{
        members: true
      }
    })
    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }
    return data;

  }

  async findGroupsByVisibility(groupvisibility: GroupVisibility, amount:number, orderby:string, skipAmount:number) {
    let filter: orderBy = orderBy.DESC;
    if (orderby.toUpperCase() === orderBy.ASC) {
      filter = orderBy.ASC;
    }

    const data = await this.groupsRepository.findAndCount({
      where: {group_setting_visibility: groupvisibility},
      take: amount,
      skip:skipAmount,
      order: {
        group_name: filter
      },
      relations:{
        members: true
      }
    })

    if (data[1] !== 0) {
      data[0] = getBasicGroupInfoArray(data[0]);
    }
    
    return data;

  }

  async getGroupMembers(id: string){
    const group: Group = await this.groupsRepository.findOne({
      where: {
        id: id,
    },
    join: {
        alias: "group",
        leftJoinAndSelect: {
            "members": "group.members",
            "member": "members.member"
        }
      }
    });

    group.members.forEach( function (group_member:GroupMember){
      group_member.member = getBasicUserInfo(group_member.member);
    })

  return group;
  }

  async updateGroupGeneral(id: string, updateGroupDto: UpdateGroupDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    updateGroup.group_name = updateGroupDto.group_name;
    updateGroup.group_bio = updateGroupDto.group_bio;
    updateGroup.group_profile_picture = updateGroupDto.group_profile_picture;
    updateGroup.group_banner_picture = updateGroupDto.group_banner_picture;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  async updateGroupSettings (id: string, updateGroupSettingsDto: UpdateGroupSettingsDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    updateGroup.group_userlimit = updateGroupSettingsDto.group_userlimit;
    updateGroup.group_setting_join = updateGroupSettingsDto.group_setting_join;
    updateGroup.group_setting_visibility = updateGroupSettingsDto.group_setting_visibility;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  async updateGroupDeletion (id: string, updateGroupDeletionDto: UpdateGroupDeletionDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    if ((updateGroup.group_queued_deletion === false) && (updateGroupDeletionDto.group_queued_deletion === true)) {
      updateGroup.group_queued_deletion_date = new Date();
    } else if((updateGroup.group_queued_deletion === true) && (updateGroupDeletionDto.group_queued_deletion === false)){
      updateGroup.group_queued_deletion_date = null;
    }

    updateGroup.group_queued_deletion = updateGroupDeletionDto.group_queued_deletion;

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  // function that removes a group 7 days after the deletion queue initiation
  // should only run at server refresh (during lowest traffic hours)
  async removeQueuedGroups() {
    const groups: Group[] = await this.groupsRepository.find({
      where: {
        group_queued_deletion: true,
    },
    })
    const today: Date = new Date();

    groups.forEach( function (group){
      if ((group.group_queued_deletion === true) && (group.group_queued_deletion_date.getDate() <= today.getDate()-7)) {
        this.removeGroup(group.id);
      }
    })
  }

  async removeGroup(id: string) {
    return await this.groupsRepository.delete(id);
  }
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

function getBasicGroupInfoArray(array:Group[]) {
  const cleanedArray: Group[] = [];
  array.forEach( function (group){
    let cleanedGroup: Group = getBasicGroupInfo(group);
    cleanedArray.push(cleanedGroup);
  })
  return cleanedArray;
}

function getBasicUserInfo(user:User):User{
  const cleanedUser: User = new User();
  cleanedUser.id = user.id;
  cleanedUser.user_name = user.user_name;
  cleanedUser.user_subtitle = user.user_subtitle;
  cleanedUser.user_profile_picture = user.user_profile_picture;
  return cleanedUser;
}
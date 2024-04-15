import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { User } from 'src/users/entities/user.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { UsersService } from 'src/users/users.service';
import { GroupMembersService } from 'src/group_members/group_members.service';
import { CreateGroupMemberDto } from 'src/group_members/dto/create-group_member.dto';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { CreateGroupRankDto } from 'src/group_ranks/dto/create-group_rank.dto';
import { group_rank } from 'src/group_ranks/entities/group_rank.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
    private readonly groupMembersService: GroupMembersService,
    private readonly groupranksService: GroupRanksService
  ) {}

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
    await this.groupranksService.createMemberRank(createOwnerRankDto);

    // make owner group member
    let createGroupMemberDto: CreateGroupMemberDto = new CreateGroupMemberDto();
    createGroupMemberDto.member = creator;
    createGroupMemberDto.group = savedGroup;
    await this.groupMembersService.createGroupOwner(createGroupMemberDto);
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
        links: true
      },
      where: {
        id: id,
      }
    });
    return group;
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

  async updateGroup(id: string, updateGroupDto: UpdateGroupDto) {
    let updateGroup: Group = await this.groupsRepository.findOneBy({ id });

    updateGroup.group_name = updateGroupDto.group_name;
    updateGroup.group_bio = updateGroupDto.group_bio;
    updateGroup.group_profile_picture = updateGroupDto.group_profile_picture;
    updateGroupDto.group_banner_picture = updateGroupDto.group_banner_picture;
    updateGroup.group_userlimit = updateGroupDto.group_userlimit;

    if ((updateGroup.group_queued_deletion === false) && (updateGroupDto.group_queued_deletion === true)) {
      updateGroup.group_queued_deletion = updateGroupDto.group_queued_deletion;
      updateGroup.group_queued_deletion_date = new Date();
    }

    this.groupsRepository.save(updateGroup);
    return updateGroup;
  }

  // function that removes a group 7 days after the deletion queue initiation
  // should only run at server refresh (during lowest traffic hours)
  async removeQueuedGroups() {
    const groups: Group[] = await this.groupsRepository.find()
    const today: Date = new Date();
    today.getDate()
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
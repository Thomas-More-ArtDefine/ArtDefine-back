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

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    private readonly usersService: UsersService,
    private readonly groupMembersService: GroupMembersService
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const creator: User = await this.usersService.findOneUser(createGroupDto.creator_id);
    let newGroup: Group = new Group();
    newGroup.group_name = createGroupDto.group_name;
    newGroup.creator_id = createGroupDto.creator_id;
    newGroup.group_userlimit = createGroupDto.group_userlimit;
    newGroup.creator_name = creator.user_name;
    await this.groupsRepository.save(newGroup);

    // make owner group member
    let createGroupMemberDto: CreateGroupMemberDto = new CreateGroupMemberDto();
    createGroupMemberDto.member = creator;
    createGroupMemberDto.group = await this.groupsRepository.findOne({
      where: {
        group_name: newGroup.group_name,
    }});
    this.groupMembersService.createGroupMember(createGroupMemberDto);
    return newGroup; 
  }

  async findAllGroups() {
    return getBasicGroupInfoArray(await this.groupsRepository.find());
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
      // relations: {
      //   members: true,
      // },
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


function getBasicGroupInfo(user:Group):Group{
  const cleanedGroup: Group = new Group();
  cleanedGroup.id = user.id;
  cleanedGroup.group_name = user.group_name;
  cleanedGroup.group_profile_picture = user.group_profile_picture;
  cleanedGroup.group_userlimit = user.group_userlimit;
  cleanedGroup.group_bio = user.group_bio;
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
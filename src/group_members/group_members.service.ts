import { Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group_member.dto';
import { UpdateGroupMemberDto } from './dto/update-group_member.dto';
import { GroupMember } from './entities/group_member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { GroupRank, group_rank } from 'src/group_ranks/entities/group_rank.entity';

@Injectable()
export class GroupMembersService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly groupMembersRepository: Repository<GroupMember>,
    private readonly groupRanksService: GroupRanksService
  ) {}

  async createGroupMember(createGroupMemberDto: CreateGroupMemberDto) {
    createGroupMemberDto.rank = await this.groupRanksService.findDefaultMemberRankOfGroup(createGroupMemberDto.group.id);
    this.groupMembersRepository.save(createGroupMemberDto);
    return createGroupMemberDto;
  }

  async createGroupOwner(createGroupMemberDto: CreateGroupMemberDto) {
    let group_ranks: GroupRank[] = await this.groupRanksService.findAllMemberRanksOfGroup(createGroupMemberDto.group.id);
    if (group_ranks.length === 2) {
      group_ranks.forEach(function(rank){
      if ((rank.default_rank === false) && (rank.rank === group_rank.OWNER)) {
        createGroupMemberDto.rank = rank;
      }
      })
      this.groupMembersRepository.save(createGroupMemberDto);
      return createGroupMemberDto;
    }else{
      return "this action should only be preformed on newly made groups."
    }
    
  }

  findAllGroupMembers() {
    return this.groupMembersRepository.find();
  }

  findOneGroupMember(id: string) {
    return this.groupMembersRepository.findOneBy({ id });
  }


  async updateGroupMember(id: string, updateGroupMemberDto: UpdateGroupMemberDto) {
    let updateMember: GroupMember = await this.groupMembersRepository.findOneBy({ id });
    updateMember.rank = updateGroupMemberDto.rank;
    this.groupMembersRepository.save(updateMember);
    return updateMember;
  }

  async removeGroupMember(id: string) {
    return await this.groupMembersRepository.delete(id);
  }
}

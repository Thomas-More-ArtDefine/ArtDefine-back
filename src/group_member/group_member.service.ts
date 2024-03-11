import { Injectable } from '@nestjs/common';
import { CreateGroupMemberDto } from './dto/create-group_member.dto';
import { UpdateGroupMemberDto } from './dto/update-group_member.dto';
import { GroupMember } from './entities/group_member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class GroupMemberService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly groupMembersRepository: Repository<GroupMember>,
  ) {}

  createGroupMember(createGroupMemberDto: CreateGroupMemberDto) {
    this.groupMembersRepository.save(createGroupMemberDto);
    return createGroupMemberDto;
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

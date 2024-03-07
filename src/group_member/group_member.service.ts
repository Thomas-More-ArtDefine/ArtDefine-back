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
    return this.groupMembersRepository.save(createGroupMemberDto);
  }

  findAllGroupMembers() {
    return this.groupMembersRepository.find();
  }

  findOneGroupMember(id: string) {
    return this.groupMembersRepository.findOneBy({ id });
  }

  //to be updated after userrank is added
  updateGroupMember(id: string, updateGroupMemberDto: UpdateGroupMemberDto) {
    return `This action updates a #${id} groupMember`;
  }

  async removeGroupMember(id: string) {
    return await this.groupMembersRepository.delete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupMemberService } from './group_member.service';
import { CreateGroupMemberDto } from './dto/create-group_member.dto';
import { UpdateGroupMemberDto } from './dto/update-group_member.dto';

@Controller('group-member')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMemberService.createGroupMember(createGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.groupMemberService.findAllGroupMembers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMemberService.findOneGroupMember(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMemberDto: UpdateGroupMemberDto) {
    return this.groupMemberService.updateGroupMember(id, updateGroupMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMemberService.removeGroupMember(id);
  }
}

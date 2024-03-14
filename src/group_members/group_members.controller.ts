import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { CreateGroupMemberDto } from './dto/create-group_member.dto';
import { UpdateGroupMemberDto } from './dto/update-group_member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.createGroupMember(createGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.groupMembersService.findAllGroupMembers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMembersService.findOneGroupMember(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMemberDto: UpdateGroupMemberDto) {
    return this.groupMembersService.updateGroupMember(id, updateGroupMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMembersService.removeGroupMember(id);
  }
}

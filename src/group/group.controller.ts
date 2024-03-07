import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAllGroups();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOneGroup(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.removeGroup(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupJoin, GroupVisibility } from './entities/group.entity';
import { UpdateGroupSettingsDto } from './dto/update-group-settings.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAllGroups();
  }

  @Get('search/name/:name')
  getByName(
    @Param('name') name: string,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skip') skip: number
  ){
    return this.groupsService.findGroupsByName(name, amount, orderby, skip);
  }

  @Get('search/visibility/:visibility')
  getByVisibility(
    @Param('visibility') visibility: GroupVisibility,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skip') skip: number
  ){
    return this.groupsService.findGroupsByVisibility(visibility, amount, orderby, skip);
  }

  @Get('search/join/:join')
  getByJoinSetting(
    @Param('join') join: GroupJoin,
    @Query('amount') amount:number,
    @Query('orderby') orderby: string, 
    @Query('skip') skip?: number
  ){
    return this.groupsService.findGroupsByJoinMethod(join, amount, orderby, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOneGroup(id); 
  }

  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.groupsService.getGroupMembers(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.updateGroupGeneral(id, updateGroupDto);
  }

  @Patch(':id/settings')
  updateSettings(@Param('id') id: string, @Body() updateGroupSettingsDto: UpdateGroupSettingsDto) {
    return this.groupsService.updateGroupSettings(id, updateGroupSettingsDto);
  }

  @Patch(':id/deletion')
  setDeletion(@Param('id') id: string, @Body() updateGroupSettingsDto: UpdateGroupSettingsDto) {
    //return this.groupsService.updateGroupSettings(id, updateGroupSettingsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.removeGroup(id);
  }
}

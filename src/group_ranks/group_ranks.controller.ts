import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupRanksService } from './group_ranks.service';
import { CreateGroupRankDto } from './dto/create-group_rank.dto';
import { UpdateGroupRankDto } from './dto/update-group_rank.dto';

@Controller('group-ranks')
export class GroupRanksController {
  constructor(private readonly groupRanksService: GroupRanksService) {}

  @Post()
  create(@Body() createGroupRankDto: CreateGroupRankDto) {
    return this.groupRanksService.createMemberRank(createGroupRankDto);
  }

  @Get()
  findAll() {
    return this.groupRanksService.findAllMemberRanks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupRanksService.findOneMemberRank(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupRankDto: UpdateGroupRankDto) {
    return this.groupRanksService.updateMemberRank(id, updateGroupRankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupRanksService.removeMemberRank(id);
  }
}

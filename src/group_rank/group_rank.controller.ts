import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupRankService } from './group_rank.service';
import { CreateGroupRankDto } from './dto/create-group_rank.dto';
import { UpdateGroupRankDto } from './dto/update-group_rank.dto';

@Controller('group-rank')
export class GroupRankController {
  constructor(private readonly groupRankService: GroupRankService) {}

  @Post()
  create(@Body() createGroupRankDto: CreateGroupRankDto) {
    return this.groupRankService.createMemberRank(createGroupRankDto);
  }

  @Get()
  findAll() {
    return this.groupRankService.findAllMemberRanks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupRankService.findOneMemberRank(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupRankDto: UpdateGroupRankDto) {
    return this.groupRankService.updateMemberRank(id, updateGroupRankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupRankService.removeMemberRank(id);
  }
}

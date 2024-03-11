import { Injectable } from '@nestjs/common';
import { CreateGroupRankDto } from './dto/create-group_rank.dto';
import { UpdateGroupRankDto } from './dto/update-group_rank.dto';
import { GroupRank } from './entities/group_rank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupRankService {
  constructor(
    @InjectRepository(GroupRank)
    private readonly groupRanksRepository: Repository<GroupRank>,
  ) {}

  createMemberRank(createGroupRankDto: CreateGroupRankDto) {
    this.groupRanksRepository.save(createGroupRankDto);
    return createGroupRankDto;
  }

  findAllMemberRanks() {
    return this.groupRanksRepository.find();
  }

  findOneMemberRank(id: string) {
    return this.groupRanksRepository.findOneBy({ id });
  }

  async updateMemberRank(id: string, updateGroupRankDto: UpdateGroupRankDto) {
    let updateRank: GroupRank = await this.groupRanksRepository.findOneBy({ id });
    updateRank.rank = updateGroupRankDto.rank;
    this.groupRanksRepository.save(updateRank);
    return updateRank;
  }

  async removeMemberRank(id: string) {
    return await this.groupRanksRepository.delete(id);
  }
}

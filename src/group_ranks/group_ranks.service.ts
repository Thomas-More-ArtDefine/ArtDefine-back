import { Injectable } from '@nestjs/common';
import { CreateGroupRankDto } from './dto/create-group_rank.dto';
import { UpdateGroupRankDto } from './dto/update-group_rank.dto';
import { GroupRank } from './entities/group_rank.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupRanksService {
  constructor(
    @InjectRepository(GroupRank)
    private readonly groupRanksRepository: Repository<GroupRank>,
  ) {}

  async createMemberRank(createGroupRankDto: CreateGroupRankDto) {
    return await this.groupRanksRepository.save(createGroupRankDto);
  }

  findAllMemberRanks() {
    return this.groupRanksRepository.find();
  }

  findAllMemberRanksOfGroup(id: string) {
    return this.groupRanksRepository.find({
      where: {
        group_id: id,
      }
    });
  }

  findDefaultMemberRankOfGroup(id: string) {
    return this.groupRanksRepository.findOne({
      where: {
        group_id: id,
        default_rank: true
      }
    });
  }


  findOneMemberRank(id: string) {
    return this.groupRanksRepository.findOneBy({ id });
  }

  async updateMemberRank(id: string, updateGroupRankDto: UpdateGroupRankDto) {
    let updateRank: GroupRank = await this.groupRanksRepository.findOneBy({ id });
    updateRank.rank = updateGroupRankDto.rank;

    // set new default rank for group
    if ((updateRank.default_rank != updateGroupRankDto.default_rank) && (updateGroupRankDto.default_rank === true)) {
      let ranks_in_group: GroupRank[] = await this.groupRanksRepository.find({ where: {group_id: updateRank.group_id,}})
      // find previous default rank and save it as a non default rank
      ranks_in_group.forEach( function(rank){
        if (rank.default_rank === true) {
          rank.default_rank = false;
          this.groupRanksRepository.save(rank);
        }
      })
      updateRank.default_rank = updateGroupRankDto.default_rank;
    }

    // save updated rank
    this.groupRanksRepository.save(updateRank);
    return updateRank;
  }

  async removeMemberRank(id: string) {
    return await this.groupRanksRepository.delete(id);
  }
}

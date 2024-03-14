import { Module } from '@nestjs/common';
import { GroupRanksService } from './group_ranks.service';
import { GroupRanksController } from './group_ranks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRank } from './entities/group_rank.entity';

@Module({
  controllers: [GroupRanksController],
  providers: [GroupRanksService],
  imports: [TypeOrmModule.forFeature([GroupRank])],
})
export class GroupRanksModule {}

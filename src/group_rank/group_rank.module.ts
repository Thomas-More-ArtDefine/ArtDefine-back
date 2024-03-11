import { Module } from '@nestjs/common';
import { GroupRankService } from './group_rank.service';
import { GroupRankController } from './group_rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRank } from './entities/group_rank.entity';

@Module({
  controllers: [GroupRankController],
  providers: [GroupRankService],
  imports: [TypeOrmModule.forFeature([GroupRank])],
})
export class GroupRankModule {}

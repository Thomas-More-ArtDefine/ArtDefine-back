import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { GroupMember } from './entities/group_member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { GroupRanksModule } from 'src/group_ranks/group_ranks.module';


@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  imports: [TypeOrmModule.forFeature([GroupMember]),
GroupRanksModule],
  exports: [GroupMembersService]
})
export class GroupMembersModule {}

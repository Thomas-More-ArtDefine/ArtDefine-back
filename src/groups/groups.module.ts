import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupMembersModule } from 'src/group_members/group_members.module';
import { UsersModule } from 'src/users/users.module';
import { GroupRanksModule } from 'src/group_ranks/group_ranks.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [TypeOrmModule.forFeature([Group]),
  GroupMembersModule,
  UsersModule,
  GroupRanksModule
],
})
export class GroupsModule {}

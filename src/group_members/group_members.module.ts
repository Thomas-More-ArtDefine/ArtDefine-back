import { Module } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';
import { GroupMembersController } from './group_members.controller';
import { GroupMember } from './entities/group_member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
  imports: [TypeOrmModule.forFeature([GroupMember])],
})
export class GroupMembersModule {}

import { Module } from '@nestjs/common';
import { GroupMemberService } from './group_member.service';
import { GroupMemberController } from './group_member.controller';
import { GroupMember } from './entities/group_member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GroupMemberController],
  providers: [GroupMemberService],
  imports: [TypeOrmModule.forFeature([GroupMember])],
})
export class GroupMemberModule {}

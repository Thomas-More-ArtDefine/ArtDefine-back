import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMemberDto } from './create-group_member.dto';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';
import { IsEmpty, IsObject } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';

export class UpdateGroupMemberDto extends PartialType(CreateGroupMemberDto) {
    @IsObject()
    rank: GroupRank;

    @IsEmpty()
    member: User;
    @IsEmpty()
    group: Group;
    @IsEmpty()
    member_join_date: Date;
}

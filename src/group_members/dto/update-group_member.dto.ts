import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupMemberDto } from './create-group_member.dto';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';
import { IsObject } from 'class-validator';

export class UpdateGroupMemberDto extends PartialType(CreateGroupMemberDto) {
    // @IsObject()
    // rank: GroupRank;
}

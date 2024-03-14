import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupRankDto } from './create-group_rank.dto';
import { IsEnum } from 'class-validator';
import { group_rank } from '../entities/group_rank.entity';

export class UpdateGroupRankDto extends PartialType(CreateGroupRankDto) {
    @IsEnum(group_rank)
    rank: group_rank;
}

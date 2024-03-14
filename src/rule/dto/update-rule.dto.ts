import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleDto } from './create-rule.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {
    @IsString()
    rule_name: string;
    @IsString()
    rule_value: string;
    @IsBoolean()
    is_active: boolean;
}

import { IsBoolean, IsString } from "class-validator";

export class CreateRuleDto {
    @IsString()
    rule_name: string;
    @IsString()
    rule_value: string;
    @IsBoolean()
    is_active: boolean;
}

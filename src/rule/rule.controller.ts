import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.ruleService.createRule(createRuleDto);
  }

  @Get()
  findAll() {
    return this.ruleService.findAllRules();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruleService.findOneRule(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.ruleService.updateRule(id, updateRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruleService.removeRule(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly rulesRepository: Repository<Rule>,
  ) {}

  createRule(createRuleDto: CreateRuleDto) {
    this.rulesRepository.save(createRuleDto);
    return createRuleDto;
  }

  findAllRules() {
    return this.rulesRepository.find();
  }

  findOneRule(id: string) {
    return this.rulesRepository.findOneBy({ id });
  }

  async updateRule(id: string, updateRuleDto: UpdateRuleDto) {
    let updateRule: Rule = await this.rulesRepository.findOneBy({id});
    updateRule.rule_name = updateRuleDto.rule_name;
    updateRule.rule_value = updateRuleDto.rule_value;
    updateRule.is_active = updateRuleDto.is_active;
    this.rulesRepository.save(updateRule);
    return updateRule;
  }

  async removeRule(id: string) {
    return await this.rulesRepository.delete(id);
  }
}

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from './entities/rule.entity';
import { DeleteResult, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RulesService {
  constructor(
    @InjectRepository(Rule)
    private readonly rulesRepository: Repository<Rule>,
  ) {}

  /**
   * @async
   * @returns {Promise<string>}
   * @throws {Error | NotAcceptableException}
   */
  async createRule(createRuleDto: CreateRuleDto): Promise<string> {
    try {
      if (createRuleDto.user != null && createRuleDto.group != null) {
        throw new NotAcceptableException(
          'Rule cannot have both user and group as owner',
        );
      } else if (createRuleDto.user === null && createRuleDto.group === null) {
        throw new NotAcceptableException(
          'Rule must have either user or group as owner',
        );
      } else {
        this.rulesRepository.save(createRuleDto);
        return 'New rule succesfully created.' + createRuleDto;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @returns {Promise<Rule[]>}
   * @throws {Error}
   */
  async findAllRules(): Promise<Rule[]> {
    try {
      return await this.rulesRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @async
   * @returns {Promise<Rule>}
   * @throws {Error | NotFoundException}
   */
  async findOneRule(id: string): Promise<Rule> {
    try {
      const rule: Rule = await this.rulesRepository.findOneBy({ id });
      if (rule === undefined || rule === null) {
        throw new NotFoundException('Rule not found');
      }
      return rule;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @returns {Promise<Rule>}
   * @throws {Error | NotFoundException}
   */
  async updateRule(id: string, updateRuleDto: UpdateRuleDto): Promise<Rule> {
    try {
      let updateRule: Rule = await this.rulesRepository.findOneBy({ id });
      if (updateRule === undefined || updateRule === null) {
        throw new NotFoundException('Rule to update not found');
      }
      updateRule.rule_name = updateRuleDto.rule_name;
      updateRule.rule_value = updateRuleDto.rule_value;
      updateRule.is_active = updateRuleDto.is_active;
      this.rulesRepository.save(updateRule);
      
      return updateRule;
    } catch (err) {
      throw err;
    }
  }

  /**
   * @async
   * @returns {Promise<DeleteResult>}
   * @throws {Error}
   */
  async removeRule(id: string) : Promise<DeleteResult>{
    try {
      return await this.rulesRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}

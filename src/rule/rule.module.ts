import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';

@Module({
  controllers: [RuleController],
  providers: [RuleService],
  imports: [TypeOrmModule.forFeature([Rule])],
})
export class RuleModule {}

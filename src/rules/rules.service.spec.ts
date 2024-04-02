import { Test, TestingModule } from '@nestjs/testing';
import { RulesService } from './rules.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesService,
        {
          provide: getRepositoryToken(Rule),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<RulesService>(RulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

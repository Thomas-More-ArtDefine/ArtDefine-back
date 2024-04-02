import { Test, TestingModule } from '@nestjs/testing';
import { GroupRanksService } from './group_ranks.service';
import { GroupRank } from './entities/group_rank.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GroupRanksService', () => {
  let service: GroupRanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupRanksService,
        {
          provide: getRepositoryToken(GroupRank),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<GroupRanksService>(GroupRanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

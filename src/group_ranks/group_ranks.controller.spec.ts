import { Test, TestingModule } from '@nestjs/testing';
import { GroupRanksController } from './group_ranks.controller';
import { GroupRanksService } from './group_ranks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupRank } from './entities/group_rank.entity';

describe('GroupRanksController', () => {
  let controller: GroupRanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupRanksController],
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

    controller = module.get<GroupRanksController>(GroupRanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

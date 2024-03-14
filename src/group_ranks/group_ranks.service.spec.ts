import { Test, TestingModule } from '@nestjs/testing';
import { GroupRanksService } from './group_ranks.service';

describe('GroupRanksService', () => {
  let service: GroupRanksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupRanksService],
    }).compile();

    service = module.get<GroupRanksService>(GroupRanksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

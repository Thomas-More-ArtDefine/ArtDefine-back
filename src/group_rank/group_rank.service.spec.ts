import { Test, TestingModule } from '@nestjs/testing';
import { GroupRankService } from './group_rank.service';

describe('GroupRankService', () => {
  let service: GroupRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupRankService],
    }).compile();

    service = module.get<GroupRankService>(GroupRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

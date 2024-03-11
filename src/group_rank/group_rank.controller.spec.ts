import { Test, TestingModule } from '@nestjs/testing';
import { GroupRankController } from './group_rank.controller';
import { GroupRankService } from './group_rank.service';

describe('GroupRankController', () => {
  let controller: GroupRankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupRankController],
      providers: [GroupRankService],
    }).compile();

    controller = module.get<GroupRankController>(GroupRankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

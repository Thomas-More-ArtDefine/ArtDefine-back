import { Test, TestingModule } from '@nestjs/testing';
import { GroupRanksController } from './group_ranks.controller';
import { GroupRanksService } from './group_ranks.service';

describe('GroupRanksController', () => {
  let controller: GroupRanksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupRanksController],
      providers: [GroupRanksService],
    }).compile();

    controller = module.get<GroupRanksController>(GroupRanksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

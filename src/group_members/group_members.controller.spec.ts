import { Test, TestingModule } from '@nestjs/testing';
import { GroupMembersController } from './group_members.controller';
import { GroupMembersService } from './group_members.service';

describe('GroupMembersController', () => {
  let controller: GroupMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMembersController],
      providers: [GroupMembersService],
    }).compile();

    controller = module.get<GroupMembersController>(GroupMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

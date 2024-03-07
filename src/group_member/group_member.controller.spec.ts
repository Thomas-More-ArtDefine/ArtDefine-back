import { Test, TestingModule } from '@nestjs/testing';
import { GroupMemberController } from './group_member.controller';
import { GroupMemberService } from './group_member.service';

describe('GroupMemberController', () => {
  let controller: GroupMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMemberController],
      providers: [GroupMemberService],
    }).compile();

    controller = module.get<GroupMemberController>(GroupMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

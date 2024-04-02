import { Test, TestingModule } from '@nestjs/testing';
import { GroupMembersController } from './group_members.controller';
import { GroupMembersService } from './group_members.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { GroupRanksModule } from 'src/group_ranks/group_ranks.module';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';

describe('GroupMembersController', () => {
  let controller: GroupMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupMembersController],
      providers: [GroupMembersService,
        {
          provide: getRepositoryToken(GroupMember),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },
        GroupRanksService,
        {
          provide: getRepositoryToken(GroupRank),
          useValue: {
            findOne: jest.fn()
          },
        },],
    }).compile();

    controller = module.get<GroupMembersController>(GroupMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

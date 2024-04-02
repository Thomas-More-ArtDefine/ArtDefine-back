import { Test, TestingModule } from '@nestjs/testing';
import { GroupMembersService } from './group_members.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';

describe('GroupMembersService', () => {
  let service: GroupMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<GroupMembersService>(GroupMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

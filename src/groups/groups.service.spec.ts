import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { UsersModule } from 'src/users/users.module';
import { GroupMembersModule } from 'src/group_members/group_members.module';
import { GroupRanksModule } from 'src/group_ranks/group_ranks.module';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { GroupMembersService } from 'src/group_members/group_members.service';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { GroupRanksService } from 'src/group_ranks/group_ranks.service';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports:[
      //   UsersModule,
      //   GroupMembersModule,
      //   GroupRanksModule
      // ],
      providers: [GroupsService,
        {
          provide: getRepositoryToken(Group),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn()
          },
        },
        GroupMembersService,
        {
          provide: getRepositoryToken(GroupMember),
          useValue: {
            findOne: jest.fn()
          },
        },
        GroupRanksService,
        {
          provide: getRepositoryToken(GroupRank),
          useValue: {
            findOne: jest.fn()
          },
        },
        ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

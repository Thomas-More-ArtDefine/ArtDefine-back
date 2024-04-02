import { Test, TestingModule } from '@nestjs/testing';
import { GroupMembersService } from './group_members.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupMember } from './entities/group_member.entity';

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
        },],
    }).compile();

    service = module.get<GroupMembersService>(GroupMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

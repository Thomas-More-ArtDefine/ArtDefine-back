import { Test, TestingModule } from '@nestjs/testing';
import { FoldersService } from './folders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';

describe('FoldersService', () => {
  let service: FoldersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoldersService,
        {
          provide: getRepositoryToken(Folder),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<FoldersService>(FoldersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

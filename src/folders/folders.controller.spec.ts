import { Test, TestingModule } from '@nestjs/testing';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';

describe('FoldersController', () => {
  let controller: FoldersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoldersController],
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

    controller = module.get<FoldersController>(FoldersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

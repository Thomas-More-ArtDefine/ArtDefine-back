import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessagesService } from './directmessages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Directmessage } from './entities/directmessage.entity';

describe('DirectmessagesService', () => {
  let service: DirectmessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectmessagesService,
        {
          provide: getRepositoryToken(Directmessage),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<DirectmessagesService>(DirectmessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

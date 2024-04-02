import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';

describe('LinksService', () => {
  let service: LinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<LinksService>(LinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

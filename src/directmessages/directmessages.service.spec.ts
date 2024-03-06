import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessagesService } from './directmessages.service';

describe('DirectmessagesService', () => {
  let service: DirectmessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectmessagesService],
    }).compile();

    service = module.get<DirectmessagesService>(DirectmessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

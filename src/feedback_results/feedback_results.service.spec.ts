import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultsService } from './feedback_results.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackResult } from './entities/feedback_result.entity';

describe('FeedbackResultsService', () => {
  let service: FeedbackResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackResultsService,
        {
          provide: getRepositoryToken(FeedbackResult),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<FeedbackResultsService>(FeedbackResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

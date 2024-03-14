import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultsService } from './feedback_results.service';

describe('FeedbackResultsService', () => {
  let service: FeedbackResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackResultsService],
    }).compile();

    service = module.get<FeedbackResultsService>(FeedbackResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultService } from './feedback_result.service';

describe('FeedbackResultService', () => {
  let service: FeedbackResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackResultService],
    }).compile();

    service = module.get<FeedbackResultService>(FeedbackResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

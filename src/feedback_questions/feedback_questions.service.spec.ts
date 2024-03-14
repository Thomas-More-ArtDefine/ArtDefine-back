import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionsService } from './feedback_questions.service';

describe('FeedbackQuestionsService', () => {
  let service: FeedbackQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackQuestionsService],
    }).compile();

    service = module.get<FeedbackQuestionsService>(FeedbackQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

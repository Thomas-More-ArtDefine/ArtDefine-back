import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionService } from './feedback_question.service';

describe('FeedbackQuestionService', () => {
  let service: FeedbackQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackQuestionService],
    }).compile();

    service = module.get<FeedbackQuestionService>(FeedbackQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionController } from './feedback_question.controller';
import { FeedbackQuestionService } from './feedback_question.service';

describe('FeedbackQuestionController', () => {
  let controller: FeedbackQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackQuestionController],
      providers: [FeedbackQuestionService],
    }).compile();

    controller = module.get<FeedbackQuestionController>(FeedbackQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

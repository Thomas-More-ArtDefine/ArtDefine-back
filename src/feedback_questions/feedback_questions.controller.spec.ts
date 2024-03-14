import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionsController } from './feedback_questions.controller';
import { FeedbackQuestionsService } from './feedback_questions.service';

describe('FeedbackQuestionsController', () => {
  let controller: FeedbackQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackQuestionsController],
      providers: [FeedbackQuestionsService],
    }).compile();

    controller = module.get<FeedbackQuestionsController>(FeedbackQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionsController } from './feedback_questions.controller';
import { FeedbackQuestionsService } from './feedback_questions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackQuestion } from './entities/feedback_question.entity';

describe('FeedbackQuestionsController', () => {
  let controller: FeedbackQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackQuestionsController],
      providers: [FeedbackQuestionsService,
        {
          provide: getRepositoryToken(FeedbackQuestion),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    controller = module.get<FeedbackQuestionsController>(FeedbackQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

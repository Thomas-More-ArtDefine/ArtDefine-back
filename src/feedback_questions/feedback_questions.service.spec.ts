import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackQuestionsService } from './feedback_questions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackQuestion } from './entities/feedback_question.entity';

describe('FeedbackQuestionsService', () => {
  let service: FeedbackQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<FeedbackQuestionsService>(FeedbackQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

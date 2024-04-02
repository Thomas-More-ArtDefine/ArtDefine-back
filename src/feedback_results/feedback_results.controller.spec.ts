import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultsController } from './feedback_results.controller';
import { FeedbackResultsService } from './feedback_results.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackResult } from './entities/feedback_result.entity';

describe('FeedbackResultsController', () => {
  let controller: FeedbackResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResultsController],
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

    controller = module.get<FeedbackResultsController>(FeedbackResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

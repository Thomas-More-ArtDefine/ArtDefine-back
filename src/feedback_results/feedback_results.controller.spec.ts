import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultsController } from './feedback_results.controller';
import { FeedbackResultsService } from './feedback_results.service';

describe('FeedbackResultsController', () => {
  let controller: FeedbackResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResultsController],
      providers: [FeedbackResultsService],
    }).compile();

    controller = module.get<FeedbackResultsController>(FeedbackResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

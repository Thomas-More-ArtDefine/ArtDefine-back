import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResultController } from './feedback_result.controller';
import { FeedbackResultService } from './feedback_result.service';

describe('FeedbackResultController', () => {
  let controller: FeedbackResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResultController],
      providers: [FeedbackResultService],
    }).compile();

    controller = module.get<FeedbackResultController>(FeedbackResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

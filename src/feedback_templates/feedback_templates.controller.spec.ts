import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTemplatesController } from './feedback_templates.controller';
import { FeedbackTemplatesService } from './feedback_templates.service';

describe('FeedbackTemplatesController', () => {
  let controller: FeedbackTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackTemplatesController],
      providers: [FeedbackTemplatesService],
    }).compile();

    controller = module.get<FeedbackTemplatesController>(FeedbackTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

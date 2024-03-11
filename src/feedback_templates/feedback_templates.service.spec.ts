import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTemplatesService } from './feedback_templates.service';

describe('FeedbackTemplatesService', () => {
  let service: FeedbackTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackTemplatesService],
    }).compile();

    service = module.get<FeedbackTemplatesService>(FeedbackTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

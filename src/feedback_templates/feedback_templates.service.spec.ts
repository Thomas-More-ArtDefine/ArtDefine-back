import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTemplatesService } from './feedback_templates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackTemplate } from './entities/feedback_template.entity';

describe('FeedbackTemplatesService', () => {
  let service: FeedbackTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackTemplatesService,
        {
          provide: getRepositoryToken(FeedbackTemplate),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<FeedbackTemplatesService>(FeedbackTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

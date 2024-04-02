import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTemplatesController } from './feedback_templates.controller';
import { FeedbackTemplatesService } from './feedback_templates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FeedbackTemplate } from './entities/feedback_template.entity';

describe('FeedbackTemplatesController', () => {
  let controller: FeedbackTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackTemplatesController],
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

    controller = module.get<FeedbackTemplatesController>(FeedbackTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

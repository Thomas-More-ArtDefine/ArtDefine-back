import { Injectable } from '@nestjs/common';
import { CreateFeedbackTemplateDto } from './dto/create-feedback_template.dto';
import { UpdateFeedbackTemplateDto } from './dto/update-feedback_template.dto';
import { FeedbackTemplate } from './entities/feedback_template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackTemplatesService {
  constructor(
    @InjectRepository(FeedbackTemplate)
    private readonly templatesRepository: Repository<FeedbackTemplate>,
  ) {}

  createTemplate(createFeedbackTemplateDto: CreateFeedbackTemplateDto) {
    this.templatesRepository.save(createFeedbackTemplateDto);
    return createFeedbackTemplateDto;
  }

  findAllTemplates() {
    return this.templatesRepository.find();
  }

  findOneTemplate(id: string) {
    return this.templatesRepository.findOneBy({ id });
  }

  async updateTemplate(id: string, updateFeedbackTemplateDto: UpdateFeedbackTemplateDto) {
    let updateTemplate: FeedbackTemplate = await this.templatesRepository.findOneBy({ id });
    updateTemplate.questions = updateFeedbackTemplateDto.questions;
    this.templatesRepository.save(updateTemplate);
    return updateTemplate;
  }

  async removeTemplate(id: string) {
    return await this.templatesRepository.delete(id);
  }
}

import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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


  /**
   * @async
   * @param id 
   * @returns Promise<FeedbackTemplate>
   * @throws {NotFoundException}
   */
  async findOneTemplate(id: string) : Promise<FeedbackTemplate> {
    const template: FeedbackTemplate = await this.templatesRepository.findOneBy({ id });
    if (!template) {
      throw new NotFoundException(`Template with id ${id} not found.`);
    }
    return template;
  }


  /**
   * @async
   * @param id 
   * @param updateFeedbackTemplateDto 
   * @returns FeedbackTemplate
   * @throws {NotFoundException | NotAcceptableException}
   */
  async updateTemplate(id: string, updateFeedbackTemplateDto: UpdateFeedbackTemplateDto) {
    let updateTemplate: FeedbackTemplate = await this.templatesRepository.findOneBy({ id });
    if (!updateTemplate) {
      throw new NotFoundException(`Template with id ${id} not found.`);
    }
    if (!updateFeedbackTemplateDto) {
      throw new NotAcceptableException(`No data to update.`);
    }
    updateTemplate.questions = updateFeedbackTemplateDto.questions;
    await this.templatesRepository.save(updateTemplate);
    return updateTemplate;
  }

  async removeTemplate(id: string) {
    return await this.templatesRepository.delete(id);
  }
}

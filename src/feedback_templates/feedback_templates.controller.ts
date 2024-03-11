import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackTemplatesService } from './feedback_templates.service';
import { CreateFeedbackTemplateDto } from './dto/create-feedback_template.dto';
import { UpdateFeedbackTemplateDto } from './dto/update-feedback_template.dto';

@Controller('feedback-templates')
export class FeedbackTemplatesController {
  constructor(private readonly feedbackTemplatesService: FeedbackTemplatesService) {}

  @Post()
  create(@Body() createFeedbackTemplateDto: CreateFeedbackTemplateDto) {
    return this.feedbackTemplatesService.createTemplate(createFeedbackTemplateDto);
  }

  @Get()
  findAll() {
    return this.feedbackTemplatesService.findAllTemplates();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackTemplatesService.findOneTemplate(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackTemplateDto: UpdateFeedbackTemplateDto) {
    return this.feedbackTemplatesService.updateTemplate(id, updateFeedbackTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackTemplatesService.removeTemplate(id);
  }
}

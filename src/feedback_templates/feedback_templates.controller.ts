import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
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
  async findOne(@Param('id') id: string) {
    try{
    return await this.feedbackTemplatesService.findOneTemplate(id);
  } catch (error) {
    if (error instanceof NotFoundException) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    console.log(error);
    return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFeedbackTemplateDto: UpdateFeedbackTemplateDto) {
    try{
    return await this.feedbackTemplatesService.updateTemplate(id, updateFeedbackTemplateDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    } else if (error instanceof HttpException) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    console.log(error);
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackTemplatesService.removeTemplate(id);
  }
}

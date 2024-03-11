import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackResultService } from './feedback_result.service';
import { CreateFeedbackResultDto } from './dto/create-feedback_result.dto';
import { UpdateFeedbackResultDto } from './dto/update-feedback_result.dto';

@Controller('feedback-result')
export class FeedbackResultController {
  constructor(private readonly feedbackResultService: FeedbackResultService) {}

  @Post()
  create(@Body() createFeedbackResultDto: CreateFeedbackResultDto) {
    return this.feedbackResultService.createFeedback(createFeedbackResultDto);
  }

  @Get()
  findAll() {
    return this.feedbackResultService.findAllFeedback();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackResultService.findOneFeedback(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackResultDto: UpdateFeedbackResultDto) {
    return this.feedbackResultService.updateFeedback(id, updateFeedbackResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackResultService.removeFeedback(id);
  }
}

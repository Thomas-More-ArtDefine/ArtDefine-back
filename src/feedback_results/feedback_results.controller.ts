import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackResultsService } from './feedback_results.service';
import { CreateFeedbackResultDto } from './dto/create-feedback_result.dto';
import { UpdateFeedbackResultDto } from './dto/update-feedback_result.dto';

@Controller('feedback-results')
export class FeedbackResultsController {
  constructor(private readonly feedbackResultsService: FeedbackResultsService) {}

  @Post()
  create(@Body() createFeedbackResultDto: CreateFeedbackResultDto) {
    return this.feedbackResultsService.createFeedback(createFeedbackResultDto);
  }

  @Get()
  findAll() {
    return this.feedbackResultsService.findAllFeedback();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackResultsService.findOneFeedback(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackResultDto: UpdateFeedbackResultDto) {
    return this.feedbackResultsService.updateFeedback(id, updateFeedbackResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackResultsService.removeFeedback(id);
  }
}

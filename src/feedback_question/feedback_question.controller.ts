import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackQuestionService } from './feedback_question.service';
import { CreateFeedbackQuestionDto } from './dto/create-feedback_question.dto';
import { UpdateFeedbackQuestionDto } from './dto/update-feedback_question.dto';

@Controller('feedback-question')
export class FeedbackQuestionController {
  constructor(private readonly feedbackQuestionService: FeedbackQuestionService) {}

  @Post()
  create(@Body() createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    return this.feedbackQuestionService.createQuestion(createFeedbackQuestionDto);
  }

  @Get()
  findAll() {
    return this.feedbackQuestionService.findAllQuestions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackQuestionService.findOneQuestion(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackQuestionDto: UpdateFeedbackQuestionDto) {
    return this.feedbackQuestionService.updateQuestion(id, updateFeedbackQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackQuestionService.removeQuestion(id);
  }
}

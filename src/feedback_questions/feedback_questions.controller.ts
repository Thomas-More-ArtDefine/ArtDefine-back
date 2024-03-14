import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackQuestionsService } from './feedback_questions.service';
import { CreateFeedbackQuestionDto } from './dto/create-feedback_question.dto';
import { UpdateFeedbackQuestionDto } from './dto/update-feedback_question.dto';

@Controller('feedback-questions')
export class FeedbackQuestionsController {
  constructor(private readonly feedbackQuestionsService: FeedbackQuestionsService) {}

  @Post()
  create(@Body() createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    return this.feedbackQuestionsService.createQuestion(createFeedbackQuestionDto);
  }

  @Get()
  findAll() {
    return this.feedbackQuestionsService.findAllQuestions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackQuestionsService.findOneQuestion(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackQuestionDto: UpdateFeedbackQuestionDto) {
    return this.feedbackQuestionsService.updateQuestion(id, updateFeedbackQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackQuestionsService.removeQuestion(id);
  }
}

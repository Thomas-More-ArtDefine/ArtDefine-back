import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FeedbackQuestionsService } from './feedback_questions.service';
import { CreateFeedbackQuestionDto } from './dto/create-feedback_question.dto';
import { UpdateFeedbackQuestionDto } from './dto/update-feedback_question.dto';

@Controller('feedback-questions')
export class FeedbackQuestionsController {
  constructor(
    private readonly feedbackQuestionsService: FeedbackQuestionsService,
  ) {}

  @Post()
  async create(@Body() createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    try {
      return await this.feedbackQuestionsService.createQuestion(
        createFeedbackQuestionDto,
      );
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.feedbackQuestionsService.findAllQuestions();
    } catch (error) {
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.feedbackQuestionsService.findOneQuestion(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      console.log(error);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackQuestionDto: UpdateFeedbackQuestionDto,
  ) {
    try {
      return await this.feedbackQuestionsService.updateQuestion(
        id,
        updateFeedbackQuestionDto,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        return new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        console.log(error);
        return new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackQuestionsService.removeQuestion(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateFeedbackQuestionDto } from './dto/create-feedback_question.dto';
import { UpdateFeedbackQuestionDto } from './dto/update-feedback_question.dto';
import { FeedbackQuestion } from './entities/feedback_question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackQuestionsService {
  constructor(
    @InjectRepository(FeedbackQuestion)
    private readonly questionsRepository: Repository<FeedbackQuestion>,
  ) {}

  createQuestion(createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    this.questionsRepository.save(createFeedbackQuestionDto);
    return createFeedbackQuestionDto;
  }

  findAllQuestions() {
    return this.questionsRepository.find();
  }

  findOneQuestion(id: string) {
    return this.questionsRepository.findOneBy({ id });
  }

  async updateQuestion(id: string, updateFeedbackQuestionDto: UpdateFeedbackQuestionDto) {
    let updatequestion: FeedbackQuestion = await this.questionsRepository.findOneBy({ id });
    updatequestion.question_title = updateFeedbackQuestionDto.question_title;
    this.questionsRepository.save(updatequestion);
    return updatequestion;
  }

  async removeQuestion(id: string) {
    return await this.questionsRepository.delete(id);
  }
}

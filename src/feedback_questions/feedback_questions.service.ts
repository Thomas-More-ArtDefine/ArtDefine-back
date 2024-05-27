import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * @throws {Error}
   */
  createQuestion(createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    try {
      this.questionsRepository.save(createFeedbackQuestionDto);
      return createFeedbackQuestionDto;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @throws {Error}
   */
  findAllQuestions() {
    try {
      return this.questionsRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * @async
   * @param id - string
   * @returns Promise<FeedbackQuestion[]>
   * @throws {Error | NotFoundException}
   */
  async findOneQuestion(id: string) {
    try {
      const question: FeedbackQuestion =
        await this.questionsRepository.findOneBy({ id });
      if (!question) {
        throw new NotFoundException(`Question with id ${id} not found.`);
      }
      return question;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new Error(`Error while looking up FeedbackQuestion ${id} :` + error.message);
      }
    }
  }


  /**
   * @async
   * @param id - string
   * @param updateFeedbackQuestionDto
   * @returns Promise<FeedbackQuestion>
   * @throws {Error | NotFoundException}
   */
  async updateQuestion(
    id: string,
    updateFeedbackQuestionDto: UpdateFeedbackQuestionDto,
  ) {
    try {
      let updatequestion: FeedbackQuestion =
        await this.questionsRepository.findOneBy({ id });
      if (!updatequestion) {
        throw new NotFoundException(`Question with id ${id} not found.`);
      }
      updatequestion.question_title = updateFeedbackQuestionDto.question_title;
      this.questionsRepository.save(updatequestion);
      return updatequestion;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new Error(err);
    }
  }

  async removeQuestion(id: string) {
    try {
      return await this.questionsRepository.delete(id);
    } catch (err) {
      throw new Error(err);
    }
  }
}

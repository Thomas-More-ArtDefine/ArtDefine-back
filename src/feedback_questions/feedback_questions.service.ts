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



  /** 
 * @throws {Error}
 */
  createQuestion(createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
    try{
    this.questionsRepository.save(createFeedbackQuestionDto);
    return createFeedbackQuestionDto;
    }catch(err){
      throw new Error(err);
    }
  }

    /** 
 * @throws {Error}
 */
  findAllQuestions() {
    try{
    return this.questionsRepository.find();
    }catch(err){
      throw new Error(err);
    }
  }

  
  findOneQuestion(id: string) {
    try{
    return this.questionsRepository.findOneBy({ id });
  }catch(err){
    throw new Error(err);
  }
  }

  async updateQuestion(id: string, updateFeedbackQuestionDto: UpdateFeedbackQuestionDto) {
    try{
    let updatequestion: FeedbackQuestion = await this.questionsRepository.findOneBy({ id });
    updatequestion.question_title = updateFeedbackQuestionDto.question_title;
    this.questionsRepository.save(updatequestion);
    return updatequestion;
  }catch(err){
    throw new Error(err);
  }
  }

  async removeQuestion(id: string) {
    try{
    return await this.questionsRepository.delete(id);
  }catch(err){
    throw new Error(err);
  }
  }
}

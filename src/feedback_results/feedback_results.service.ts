import { Injectable } from '@nestjs/common';
import { CreateFeedbackResultDto } from './dto/create-feedback_result.dto';
import { UpdateFeedbackResultDto } from './dto/update-feedback_result.dto';
import { FeedbackResult } from './entities/feedback_result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackResultsService {
  constructor(
    @InjectRepository(FeedbackResult)
    private readonly feedbackRepository: Repository<FeedbackResult>,
  ) {}

  createFeedback(createFeedbackResultDto: CreateFeedbackResultDto) {
    return this.feedbackRepository.save(createFeedbackResultDto);
  }

  findAllFeedback() {
    return this.feedbackRepository.find();
  }

  findOneFeedback(id: string) {
    return this.feedbackRepository.findOneBy({ id });
  }

  async updateFeedback(id: string, updateFeedbackResultDto: UpdateFeedbackResultDto) {
    let updateFeedback: FeedbackResult = await this.feedbackRepository.findOneBy({ id });
    updateFeedback.feedback_result = updateFeedbackResultDto.feedback_result;
    this.feedbackRepository.save(updateFeedback);
    return updateFeedback;
  }

  async removeFeedback(id: string) {
    return await this.feedbackRepository.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { FeedbackQuestionService } from './feedback_question.service';
import { FeedbackQuestionController } from './feedback_question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackQuestion } from './entities/feedback_question.entity';

@Module({
  controllers: [FeedbackQuestionController],
  providers: [FeedbackQuestionService],
  imports: [TypeOrmModule.forFeature([FeedbackQuestion])],
})
export class FeedbackQuestionModule {}

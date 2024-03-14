import { Module } from '@nestjs/common';
import { FeedbackQuestionsService } from './feedback_questions.service';
import { FeedbackQuestionsController } from './feedback_questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackQuestion } from './entities/feedback_question.entity';


@Module({
  controllers: [FeedbackQuestionsController],
  providers: [FeedbackQuestionsService],
  imports: [TypeOrmModule.forFeature([FeedbackQuestion])],
})
export class FeedbackQuestionsModule {}

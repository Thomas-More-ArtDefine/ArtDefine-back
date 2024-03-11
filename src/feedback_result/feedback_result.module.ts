import { Module } from '@nestjs/common';
import { FeedbackResultService } from './feedback_result.service';
import { FeedbackResultController } from './feedback_result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResult } from './entities/feedback_result.entity';

@Module({
  controllers: [FeedbackResultController],
  providers: [FeedbackResultService],
  imports: [TypeOrmModule.forFeature([FeedbackResult])],
})
export class FeedbackResultModule {}

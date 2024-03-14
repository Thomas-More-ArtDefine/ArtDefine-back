import { Module } from '@nestjs/common';
import { FeedbackResultsService } from './feedback_results.service';
import { FeedbackResultsController } from './feedback_results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackResult } from './entities/feedback_result.entity';

@Module({
  controllers: [FeedbackResultsController],
  providers: [FeedbackResultsService],
  imports: [TypeOrmModule.forFeature([FeedbackResult])],
})
export class FeedbackResultsModule {}

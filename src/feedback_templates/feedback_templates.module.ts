import { Module } from '@nestjs/common';
import { FeedbackTemplatesService } from './feedback_templates.service';
import { FeedbackTemplatesController } from './feedback_templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackTemplate } from './entities/feedback_template.entity';

@Module({
  controllers: [FeedbackTemplatesController],
  providers: [FeedbackTemplatesService],
  imports: [TypeOrmModule.forFeature([FeedbackTemplate])],
})
export class FeedbackTemplatesModule {}

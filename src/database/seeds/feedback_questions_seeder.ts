import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { FeedbackQuestion, questionType } from 'src/feedback_questions/entities/feedback_question.entity';
import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';

export default class FeedbackQuestionSeeder implements Seeder {


    private templates: FeedbackTemplate[];

    public setTemplates(templates: FeedbackTemplate[]): void {
        this.templates = templates;
    }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<FeedbackQuestion[]> {
    await dataSource.query('DELETE FROM "feedback_question";');
    const repository = dataSource.getRepository(FeedbackQuestion);

    const feedbackQuestions: FeedbackQuestion[] = [
        {
            id: undefined,
            question_title: "How did you think about the colors?",
            question_type: questionType.STARS,
            template_id: this.templates[0].id,
            content: {} as JSON,
            template: this.templates[0]
        },]

   

    return await repository.save(feedbackQuestions);
  }
}

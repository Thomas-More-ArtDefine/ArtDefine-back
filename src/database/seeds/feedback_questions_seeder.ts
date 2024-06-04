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
          question_title: "How would you rate the use of color?",
          question_type: questionType.STARS,
          template_id: this.templates[0].id,
          content: null,
          template: this.templates[0],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "What do you find most captivating ?",
          question_type: questionType.OPEN,
          template_id: this.templates[0].id,
          content: null,
          template: this.templates[0],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "What feeling does it bring to you?",
          question_type: questionType.BULLETPOINTS,
          template_id: this.templates[0].id,
          content:"[\"Love\",\"Anger\",\"Joy\"]",
          template: this.templates[0],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "How would you rate the use of color?",
          question_type: questionType.STARS,
          template_id: this.templates[1].id,
          content: null,
          template: this.templates[1],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "How much are you emotionally moved?",
          question_type: questionType.STARS,
          template_id: this.templates[1].id,
          content: null,
          template: this.templates[1],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "How you does the title fit the artpiece?",
          question_type: questionType.STARS,
          template_id: this.templates[1].id,
          content: null,
          template: this.templates[1],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "What do you find most captivating ?",
          question_type: questionType.OPEN,
          template_id: this.templates[2].id,
          content: null,
          template: this.templates[2],
          feedback_results: [],
        },
        {
          id: undefined,
          question_title: "How I can enhance the play of light ? ?",
          question_type: questionType.OPEN,
          template_id: this.templates[2].id,
          content: null,
          template: this.templates[2],
          feedback_results: [],
        }

      ]

   

    return await repository.save(feedbackQuestions);
  }
}

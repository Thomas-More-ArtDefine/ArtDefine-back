import { FeedbackResult } from 'src/feedback_results/entities/feedback_result.entity';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';
import { User } from 'src/users/entities/user.entity';

export default class FeedbackResultSeeder implements Seeder {
  private templates: FeedbackTemplate[];
  private users: User[];

  public setUsers(users: User[]): void {
    this.users = users;
  }

  public setTemplates(templates: FeedbackTemplate[]): void {
    this.templates = templates;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<FeedbackResult[]> {
    await dataSource.query('DELETE FROM "feedback_result";');
    const repository = dataSource.getRepository(FeedbackResult);

    const feedbackResults: FeedbackResult[] = [
      {
        id: undefined,
        feedback_result: { response: '4' } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[0].questions[0].id,
        question: this.templates[0].questions[0],
      },
      {
        id: undefined,
        feedback_result: {
          response:
            "I absolutely love the ethereal glow on the trees and the magical atmosphere you've created! The play of light and shadows adds depth to the enchanted woodland. 🌟 #MagicalArtistry",
        } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[0].questions[1].id,
        question: this.templates[0].questions[1],
      },
      {
        id: undefined,
        feedback_result: { response: '2' } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[0].questions[2].id,
        question: this.templates[0].questions[2],
      },
      {
        id: undefined,
        feedback_result: { response: '3' } as unknown as JSON,
        user_id: this.users[2].id,
        user: this.users[2],
        question_id: this.templates[0].questions[0].id,
        question: this.templates[0].questions[0],
      },
      {
        id: undefined,
        feedback_result: {
          response:
            'I love the colors and the way they blend together. The colors are vibrant and make the piece pop.',
        } as unknown as JSON,
        user_id: this.users[2].id,
        user: this.users[2],
        question_id: this.templates[0].questions[1].id,
        question: this.templates[0].questions[1],
      },
      {
        id: undefined,
        feedback_result: { response: '1' } as unknown as JSON,
        user_id: this.users[2].id,
        user: this.users[2],
        question_id: this.templates[0].questions[2].id,
        question: this.templates[0].questions[2],
      },
      {
        id: undefined,
        feedback_result: { response: '4' } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[1].questions[0].id,
        question: this.templates[1].questions[0],
      },
      {
        id: undefined,
        feedback_result: { response: '2' } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[1].questions[1].id,
        question: this.templates[1].questions[1],
      },
      {
        id: undefined,
        feedback_result: { response: '5' } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[1].questions[2].id,
        question: this.templates[1].questions[2],
      },
      {
        id: undefined,
        feedback_result: {
          response:
            'I love the colors and the way they blend together. The colors are vibrant and make the piece pop.',
        } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[2].questions[0].id,
        question: this.templates[2].questions[0],
      },
      {
        id: undefined,
        feedback_result: {
          response:
            'I love the shading! Maybe try emphasizing the contrast a bit more for a bolder effect. Also, consider adding subtle highlights to certain areas for added depth. Great work overall! 🎨 #ArtFeedback',
        } as unknown as JSON,
        user_id: this.users[1].id,
        user: this.users[1],
        question_id: this.templates[2].questions[1].id,
        question: this.templates[2].questions[1],
      },
    ];

    return await repository.save(feedbackResults);
  }
}

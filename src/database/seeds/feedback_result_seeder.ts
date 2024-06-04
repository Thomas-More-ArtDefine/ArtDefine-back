import { FeedbackResult } from "src/feedback_results/entities/feedback_result.entity";
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FeedbackTemplate } from "src/feedback_templates/entities/feedback_template.entity";
import { User } from "src/users/entities/user.entity";

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
            feedback_result: {response: "4"} as unknown as JSON,
            user_id: this.users[0].id,
            user: this.users[0],
            question_id: this.templates[0].questions[0].id,
            question: this.templates[0].questions[0],
        },
        {
          id: undefined,
            feedback_result: {response: "1"} as unknown as JSON,
            user_id: this.users[1].id,
            user: this.users[1],
            question_id: this.templates[0].questions[0].id,
            question: this.templates[0].questions[0],
        }
    ];

   

    return await repository.save(feedbackResults);
  }
}

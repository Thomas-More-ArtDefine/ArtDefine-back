import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';
import { Post } from 'src/posts/entities/post.entity';
import { questionType } from 'src/feedback_questions/entities/feedback_question.entity';

export default class FeedbackTemplateSeeder implements Seeder {
  private savedPosts: Post[];

  public setPosts(posts: Post[]): void {
    this.savedPosts = posts;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<FeedbackTemplate[]> {
    await dataSource.query('DELETE FROM "feedback_template";');
    const repository = dataSource.getRepository(FeedbackTemplate);

    const feedbackTemplates: FeedbackTemplate[] = [
      {
        id: undefined,
        post_id: this.savedPosts[0].id,
        post: this.savedPosts[0],
        questions: [],
       
      },
    ];

    return await repository.save(feedbackTemplates);
  }
}

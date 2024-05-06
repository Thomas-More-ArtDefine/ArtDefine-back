// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { visibility } from 'src/app.controller';
import { Folder } from 'src/folders/entities/folder.entity';

export class PostSeeder implements Seeder {
  private savedUsers: User[];
  private savedFolders: Folder[];

  public setUsers(users: User[]): void {
    this.savedUsers = users;
  }

  public setFolders(folders: Folder[]): void {
    this.savedFolders = folders;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<Post[]> {
    await dataSource.query('DELETE FROM "post";');
    const repository = dataSource.getRepository(Post);

    const posts: Post[] = [
      {
        user_id: null,
        post_content: 'link/to/post',
        post_title: 'Post 1',
        post_tags: 'tag1, tag2',
        post_description: 'This is a post',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[0],
        folders: [this.savedFolders[0]],
        feedback_template: null,
      },
    ];
    return await repository.save(posts);
  }
}
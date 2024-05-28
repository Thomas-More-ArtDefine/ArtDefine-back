// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { visibility } from 'src/app.controller';
import { Folder } from 'src/folders/entities/folder.entity';
import * as fs from 'fs';
import * as path from 'path';

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
    
    const artwork1 = `https://i.imgur.com/FJ0GZMR.jpg`;

  
    const artworklily = `https://i.imgur.com/2vFH3yn.jpg`;

   
    const artworkparis = `https://i.imgur.com/WGMVQVS.jpg`;

    const artworkocean = `https://i.imgur.com/2vFH3yn.jpg`;


    const artworkcat = `https://i.imgur.com/7RpoQhU.jpg`;


    await dataSource.query('DELETE FROM "post";');
    const repository = dataSource.getRepository(Post);

    const posts: Post[] = [
      {
        user_id: null,
        post_content: artwork1,
        post_title: 'Road of Color',
        post_tags: 'digital, fantasy, colorful',
        post_description: 'This is a post',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[0],
        folders: [this.savedFolders[0],this.savedFolders[4]],
        feedback_template: null,
      },
      {
        user_id: null,
        post_content: artworklily,
        post_title: 'White Lily',
        post_tags: 'flower, traditional, painting',
        post_description: 'Still life study of a white lily flower.',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[1],
        folders: [this.savedFolders[1],this.savedFolders[4]],
        feedback_template: null,
      },
      {
        user_id: null,
        post_content: artworkparis,
        post_title: 'Street in Paris',
        post_tags: 'Paris, traditional, painting',
        post_description: 'Oil painting.',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[1],
        folders: [this.savedFolders[1],this.savedFolders[2]],
        feedback_template: null,
      },
      {
        user_id: null,
        post_content: artworkocean,
        post_title: 'Ocean of Paint',
        post_tags: 'ocean, traditional, painting',
        post_description: 'Oil painting of the ocean.',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[1],
        folders: [this.savedFolders[1],this.savedFolders[5]],
        feedback_template: null,
      },
      {
        user_id: null,
        post_content: artworkcat,
        post_title: 'Shining Shadow',
        post_tags: 'cat, digital, mystical',
        post_description: 'Inspired by my sweet kitty Shadow.',
        post_visibility: visibility.PUBLIC,
        post_uploaddate: new Date(),
        id: null,
        user: this.savedUsers[2],
        folders: [this.savedFolders[3],this.savedFolders[4],this.savedFolders[5]],
        feedback_template: null,
      },
    ];
    return await repository.save(posts);
  }
}

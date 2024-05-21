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
    
    const artwork1 = `https://media.discordapp.net/attachments/1159147970038607933/1242385965054427137/AdobeStock_408368585.jpeg?ex=664da598&is=664c5418&hm=fbf8130fcb0ec01611fc5bb4ec9e862c140f3ecf65bed8f9914869cffd34887a&=&format=webp&width=1193&height=671`;

  
    const artworklily = `https://media.discordapp.net/attachments/1159147970038607933/1242385962169008138/AdobeStock_71266838.jpeg?ex=664da597&is=664c5417&hm=41bed921789f5f9cff8b3a962a41ef6311783394f275d1a4fde1594a60dfed6c&=&format=webp&width=594&height=671`;

   
    const artworkparis = `https://media.discordapp.net/attachments/1159147970038607933/1242385962571399178/AdobeStock_76809767.jpeg?ex=664da597&is=664c5417&hm=3993707c5e777ff579464d41dc8e8340c942f31dbd5107cb806a6907a9f436ea&=&format=webp&width=894&height=671`;


    const artworkocean = `https://media.discordapp.net/attachments/1159147970038607933/1242385963137634344/AdobeStock_141271349.jpeg?ex=664da598&is=664c5418&hm=3465e888d35c47b855587fe2c15db8841be38e652c0be28414958364e72f4a91&=&format=webp&width=906&height=671`;


    const artworkcat = `https://media.discordapp.net/attachments/1159147970038607933/1242385965595754507/AdobeStock_614142803.jpeg?ex=664da598&is=664c5418&hm=23e4328c21dbcb01999ad47614f182fce059240fb231febf9e95be413f340f09&=&format=webp&width=503&height=671`;


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

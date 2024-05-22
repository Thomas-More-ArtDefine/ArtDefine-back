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
    
    const artwork1 = `https://media.discordapp.net/attachments/1159147970038607933/1242385965054427137/AdobeStock_408368585.jpeg?ex=664ef718&is=664da598&hm=a33567717b90a2b12f76f87d99e40d2067442aaabf31110603dc9e12d5ad41f7&=&format=webp&width=1193&height=671`;

  
    const artworklily = `https://media.discordapp.net/attachments/1159147970038607933/1242385962169008138/AdobeStock_71266838.jpeg?ex=664ef717&is=664da597&hm=324dc0029aa101f6b0090cebbdbcdaf436e527321f8ca1d6cbb6ae6f7699020b&=&format=webp&width=594&height=671`;

   
    const artworkparis = `https://media.discordapp.net/attachments/1159147970038607933/1242385962571399178/AdobeStock_76809767.jpeg?ex=664ef717&is=664da597&hm=542b9b373265e0e6b8a855e1fd88e35815365bde00d30bde74e8f413817c1281&=&format=webp&width=894&height=671`;

    const artworkocean = `https://media.discordapp.net/attachments/1159147970038607933/1242385963137634344/AdobeStock_141271349.jpeg?ex=664ef718&is=664da598&hm=66b98ed847f052a461d8277d438bf1c71cbd32891de95c383b3de88dc9a140b3&=&format=webp&width=906&height=671`;


    const artworkcat = `https://media.discordapp.net/attachments/1159147970038607933/1242385965595754507/AdobeStock_614142803.jpeg?ex=664ef718&is=664da598&hm=c8ee6f8bfdbb51ed2b0efd21d9f6fd5fb4d95378040f15c345159d650b3321d2&=&format=webp&width=503&height=671`;


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

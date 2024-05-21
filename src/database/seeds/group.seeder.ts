// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Group,
  GroupJoin,
  GroupVisibility,
} from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

export class GroupSeeder implements Seeder {
  private savedUsers: User[];

  public setUsers(users: User[]): void {
    this.savedUsers = users;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<Group[]> {
    await dataSource.query('DELETE FROM "group";');
    const repository = dataSource.getRepository(Group);

   
    const banner1 = `https://media.discordapp.net/attachments/1159147970038607933/1242385964370759681/AdobeStock_328538275.jpeg?ex=664da598&is=664c5418&hm=b07a7ce843aec351642aa2cec693c7c16e0a345efe3f15503c32ad49d3269555&=&format=webp&width=981&height=671`;
  
    const pfp1 = `https://media.discordapp.net/attachments/1159147970038607933/1242385964748505170/AdobeStock_328538275-s.jpeg?ex=664da598&is=664c5418&hm=230e15dde56a9073621c3b1e627361881ee2428a3ef8ce2ccc82928681cfcece&=&format=webp&width=675&height=671`;
    
    const groups: Group[] = [
      {
        group_name: 'All For Art',
        creator_id: this.savedUsers[0].id,
        creator_name: this.savedUsers[0].user_name,
        group_creationdate: new Date(),
        group_userlimit: 10,
        group_bio: 'We are a group dedicated to all things visual art. Come join the fun!',
        group_profile_picture: pfp1,
        group_banner_picture: banner1,
        group_queued_deletion: false,
        group_queued_deletion_date: null,
        group_setting_visibility: GroupVisibility.PUBLIC,
        group_setting_join: GroupJoin.INVITE,
        id: null,
        members: null,
        links: [],
        folders: [],
        rules: [],
        ranks: [],
      },
      {
        group_name: 'Inktopia',
        creator_id: this.savedUsers[1].id,
        creator_name: this.savedUsers[1].user_name,
        group_creationdate: new Date(),
        group_userlimit: 10,
        group_bio: 'Delicate inkwork specialists.',
        group_profile_picture: '',
        group_banner_picture: '',
        group_queued_deletion: false,
        group_queued_deletion_date: null,
        group_setting_visibility: GroupVisibility.PUBLIC,
        group_setting_join: GroupJoin.INVITE,
        id: null,
        members: null,
        links: [],
        folders: [],
        rules: [],
        ranks: [],
      },
    ];
    return await repository.save(groups);
  }
}

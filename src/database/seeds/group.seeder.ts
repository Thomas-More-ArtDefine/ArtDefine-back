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

    let artworkPath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_328538275.jpeg');
    const banner1 = `data:image/jpeg;base64,${fs.readFileSync(artworkPath).toString('base64')}`;
    artworkPath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_328538275-s.jpeg');
    const pfp1 = `data:image/jpeg;base64,${fs.readFileSync(artworkPath).toString('base64')}`;
    
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

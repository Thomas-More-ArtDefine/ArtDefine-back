// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Group,
  GroupJoin,
  GroupVisibility,
} from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

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

    const groups: Group[] = [
      {
        group_name: 'Group 1',
        creator_id: this.savedUsers[0].id,
        creator_name: this.savedUsers[0].user_name,
        group_creationdate: new Date(),
        group_userlimit: 10,
        group_bio: 'This is a group',
        group_profile_picture: '',
        group_banner_picture: '',
        group_queued_deletion: false,
        group_queued_deletion_date: null,
        group_setting_visibility: GroupVisibility.PRIVATE,
        group_setting_join: GroupJoin.INVITE,
        id: null,
        members: null,
        links: [],
        folders: [],
        rules: [],
        ranks: [],
      },
      {
        group_name: 'Group 2',
        creator_id: this.savedUsers[1].id,
        creator_name: this.savedUsers[1].user_name,
        group_creationdate: new Date(),
        group_userlimit: 10,
        group_bio: 'This is a group',
        group_profile_picture: '',
        group_banner_picture: '',
        group_queued_deletion: false,
        group_queued_deletion_date: null,
        group_setting_visibility: GroupVisibility.PRIVATE,
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
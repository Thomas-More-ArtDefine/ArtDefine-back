// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Group,
  GroupJoin,
  GroupVisibility,
} from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Link } from 'src/links/entities/link.entity';

export class LinkSeeder implements Seeder {
  private savedUsers: User[];
  private savedGroups: Group[];

  public setUsers(users: User[]): void {
    this.savedUsers = users;
  }

  public setGroups(groups: Group[]): void {
    this.savedGroups = groups;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('DELETE FROM "link";');
    const repository = dataSource.getRepository(Link);

    const links: Link[] = [
      {
        id: undefined,
        user_id: undefined,
        user: this.savedUsers[0],
        group_id: undefined,
        group: undefined,
        link_name: 'My link',
        link_url: 'https://www.google.com',
      },
      {
        id: undefined,
        user_id: undefined,
        user: this.savedUsers[0],
        group_id: undefined,
        group: undefined,
        link_name: 'My link 2',
        link_url: 'https://www.google.com',
      },
      {
        id: undefined,
        user_id: undefined,
        user: undefined,
        group_id: undefined,
        group: this.savedGroups[0],
        link_name: 'My link 3',
        link_url: 'https://www.google.com',
      },
    ];
    await repository.save(links);
  }
}

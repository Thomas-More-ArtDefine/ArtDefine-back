// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Group,
  GroupJoin,
  GroupVisibility,
} from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { visibility } from 'src/app.controller';

export class FolderSeeder implements Seeder {
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
  ): Promise<Folder[]> {
    await dataSource.query('DELETE FROM "folder";');
    const repository = dataSource.getRepository(Folder);

    const folders: Folder[] = [
      {
        user_id: null,
        group_id: null,
        folder_order: 1,
        folder_name: 'General',
        folder_description: '',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[0],
        group: null,
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 1,
        folder_name: 'Oil Paintings',
        folder_description: 'All my oil paintings <3',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[1],
        group: null,
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 2,
        folder_name: 'General',
        folder_description: '',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[1],
        group: null,
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 1,
        folder_name: 'The General Store',
        folder_description: 'Come all come see, all my art for all to see!',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[2],
        group: null,
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 1,
        folder_name: 'Highlights 2024',
        folder_description: 'All the best work from our members in 2024.',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: null,
        group: this.savedGroups[0],
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 2,
        folder_name: 'Color challenge - March',
        folder_description: '',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: null,
        group: this.savedGroups[0],
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 1,
        folder_name: 'Inktastic - 2024',
        folder_description: '',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: null,
        group: this.savedGroups[1],
        posts: [],
      }
      
    ];
    return await repository.save(folders);
  }
}

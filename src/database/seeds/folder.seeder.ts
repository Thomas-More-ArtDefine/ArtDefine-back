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
        folder_name: 'Folder 1',
        folder_description: 'This is a folder',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[0],
        group: this.savedGroups[0],
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 2,
        folder_name: 'Folder 2',
        folder_description: 'This is a folder',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[0],
        group: this.savedGroups[0],
        posts: [],
      },
      {
        user_id: null,
        group_id: null,
        folder_order: 3,
        folder_name: 'Folder 3',
        folder_description: 'This is a folder',
        folder_archived: false,
        folder_visibility: visibility.PUBLIC,
        id: null,
        user: this.savedUsers[1],
        group: this.savedGroups[0],
        posts: [],
      },
    ];
    return await repository.save(folders);
  }
}

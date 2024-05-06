// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';

export class GroupMembersSeeder implements Seeder {
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
  ): Promise<GroupMember[]> {
    await dataSource.query('DELETE FROM "group_member";');
    const repository = dataSource.getRepository(GroupMember);

    const group_members = [
      {
        group_id: this.savedGroups[0].id,
        member_id: this.savedUsers[0].id,
        grouprank_id: null,
      },
      {
        group_id: this.savedGroups[0].id,
        member_id: this.savedUsers[1].id,
        grouprank_id: null,
      },
      {
        group_id: this.savedGroups[0].id,
        member_id: this.savedUsers[2].id,
        grouprank_id: null,
      },
    ];
    return await repository.save(group_members);
  }
}

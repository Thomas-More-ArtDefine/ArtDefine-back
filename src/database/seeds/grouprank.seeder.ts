// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {
  Group,
  GroupJoin,
  GroupVisibility,
} from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import {
  GroupRank,
} from 'src/group_ranks/entities/group_rank.entity';

export class GroupMembersSeeder implements Seeder {
  private savedUsers: User[];
  private savedGroups: Group[];

  public setGroups(groups: Group[]): void {
    this.savedGroups = groups;
  }

  public setUsers(users: User[]): void {
    this.savedUsers = users;
  }

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('DELETE FROM "group_rank";');
    const repository = dataSource.getRepository(GroupRank);

    const group_rank: GroupRank[] = [];
    await repository.save(group_rank);
  }
}

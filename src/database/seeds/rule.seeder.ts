// src/database/seeds/group.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Rule } from 'src/rules/entities/rule.entity';

export class RuleSeeder implements Seeder {
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
    await dataSource.query('DELETE FROM "rule";');
    const repository = dataSource.getRepository(Rule);

    const rules: Rule[] = [
      {
        id: undefined,
        rule_name: 'Acceptence criteria',
        rule_value: 'We only accept people that are nice',
        is_active: true,
        group_id: undefined,
        group: this.savedGroups[0],
        user_id: undefined,
        user: null,
      },
      {
        id: undefined,
        rule_name: 'House rules',

        rule_value: 'Be nice and create a good atmosphere',
        is_active: true,
        group_id: undefined,
        group: this.savedGroups[0],
        user_id: undefined,
        user: null,
      },
      {
        id: undefined,
        rule_name: 'NSFW content',
        rule_value: 'No NSFW content allowed',
        is_active: true,
        group_id: undefined,
        group: this.savedGroups[0],
        user_id: undefined,
        user: null,
      },
    ];
    await repository.save(rules);
  }
}

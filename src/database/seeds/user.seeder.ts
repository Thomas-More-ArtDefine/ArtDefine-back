import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<User[]> {

    const profilePicturePath = path.join(__dirname, '../../../src/database/mock/assets/mock-profile-pic.png');
    const profilePicture = fs.readFileSync(profilePicturePath).toString('base64');

    await dataSource.query('DELETE FROM "user";');
    const repository = dataSource.getRepository(User);
    const users: User[] = [
      {
        user_name: 'Test User',
        user_email: 'testuser@example.com',
        user_password: 'testpassword',
        user_bio: 'This is a test user',
        user_profile_picture: `data:image/png;base64,${profilePicture}`,
        user_banner_picture: '',
        user_pronouns: 'he/him',
        user_subtitle: 'Test Subtitle',
        user_creationdate: new Date(),
        user_deactivated: false,
        user_deactivation_date: null,
        id: undefined,
        posts: [],
        groups: [],
        send_messages: [],
        received_messages: [],
        links: [],
        folders: [],
        given_feedback: [],
        following: [],
        rules: [],
      },
      {
        user_name: 'User 2',
        user_email: 'user2@example.com',
        user_password: 'password2',
        user_bio: 'This is user 2',
        user_profile_picture: `data:image/png;base64,${profilePicture}`,
        user_banner_picture: '',
        user_pronouns: 'she/her',
        user_subtitle: 'User 2 Subtitle',
        user_creationdate: new Date(),
        user_deactivated: false,
        user_deactivation_date: null,
        id: null,
        posts: [],
        groups: [],
        send_messages: [],
        received_messages: [],
        links: [],
        folders: [],
        given_feedback: [],
        following: [],
        rules: [],
      },
      {
        user_name: 'User 3',
        user_email: 'user3@example.com',
        user_password: 'password3',
        user_bio: 'This is user 3',
        user_profile_picture: `data:image/png;base64,${profilePicture}`,
        user_banner_picture: '',
        user_pronouns: 'they/them',
        user_subtitle: 'User 3 Subtitle',
        user_creationdate: new Date(),
        user_deactivated: false,
        user_deactivation_date: null,
        id: null,
        posts: [],
        groups: [],
        send_messages: [],
        received_messages: [],
        links: [],
        folders: [],
        given_feedback: [],
        following: [],
        rules: [],
      },
    ];

    const savedUsers = await repository.save(users);
    return savedUsers;
  }
}

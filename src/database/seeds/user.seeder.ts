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

    let profilePicturePath = path.join(__dirname, '../../../src/database/mock/assets/mock-pfp-2.png');
    const profilePicture = fs.readFileSync(profilePicturePath).toString('base64');
    let bannerPicturePath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_408368585.jpeg');
    const bannerPicture = fs.readFileSync(bannerPicturePath).toString('base64');

    profilePicturePath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_234285630.jpeg');
    const profilePicture2 = fs.readFileSync(profilePicturePath).toString('base64');
    bannerPicturePath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_76809767.jpeg');
    const bannerPicture2 = fs.readFileSync(bannerPicturePath).toString('base64');

    profilePicturePath = path.join(__dirname, '../../../src/database/mock/assets/AdobeStock_582643528.jpeg');
    const profilePicture3 = fs.readFileSync(profilePicturePath).toString('base64');

    await dataSource.query('DELETE FROM "user";');
    const repository = dataSource.getRepository(User);
    const users: User[] = [
      {
        user_name: 'Maximus',
        user_email: 'testuser@example.com',
        user_password: 'testpassword',
        user_bio: 'This is a test user',
        user_profile_picture: `data:image/png;base64,${profilePicture}`,
        user_banner_picture:`data:image/jpeg;base64,${bannerPicture}`,
        user_pronouns: 'he/him',
        user_subtitle: 'Passionate pencil collector.',
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
        user_name: 'OliWii',
        user_email: 'user2@example.com',
        user_password: 'password2',
        user_bio: 'This is user 2',
        user_profile_picture: `data:image/jpeg;base64,${profilePicture2}`,
        user_banner_picture: `data:image/jpeg;base64,${bannerPicture2}`,
        user_pronouns: 'she/her',
        user_subtitle: 'Art student',
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
        user_name: 'LittleWizz',
        user_email: 'user3@example.com',
        user_password: 'password3',
        user_bio: 'This is user 3',
        user_profile_picture: `data:image/jpeg;base64,${profilePicture3}`,
        user_banner_picture: '',
        user_pronouns: 'they/them',
        user_subtitle: 'A goober who draws stuff.',
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

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
    const bannerPicture = "https://media.discordapp.net/attachments/1159147970038607933/1242385965054427137/AdobeStock_408368585.jpeg?ex=664da598&is=664c5418&hm=fbf8130fcb0ec01611fc5bb4ec9e862c140f3ecf65bed8f9914869cffd34887a&=&format=webp&width=1193&height=671";
   

    const profilePicture2= "https://media.discordapp.net/attachments/1159147970038607933/1242385963775426611/AdobeStock_234285630.jpeg?ex=664da598&is=664c5418&hm=42fc44e425834a25312784825e9fc5d3218e7a70bb1fd2bb7e953135246f5851&=&format=webp&width=661&height=670";
    

    const bannerPicture2 = "https://media.discordapp.net/attachments/1159147970038607933/1242385962571399178/AdobeStock_76809767.jpeg?ex=664da597&is=664c5417&hm=3993707c5e777ff579464d41dc8e8340c942f31dbd5107cb806a6907a9f436ea&=&format=webp&width=894&height=671";


    const profilePicture3 = "https://media.discordapp.net/attachments/1159147970038607933/1242385965293506590/AdobeStock_582643528.jpeg?ex=664da598&is=664c5418&hm=cf3876ff094adb57331b6ed4b37f532d703a87444464d4e636acae2a3d2db422&=&format=webp";

    await dataSource.query('DELETE FROM "user";');
    const repository = dataSource.getRepository(User);
    const users: User[] = [
      {
        user_name: 'Maximus',
        user_email: 'testuser@example.com',
        user_password: 'testpassword',
        user_bio: 'This is a test user',
        user_profile_picture: `data:image/jpeg;base64,${profilePicture}`,
        user_banner_picture:`${bannerPicture}`,
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
        user_profile_picture: `${profilePicture2}`,
        user_banner_picture: `${bannerPicture2}`,
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
        user_profile_picture: `${profilePicture3}`,
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

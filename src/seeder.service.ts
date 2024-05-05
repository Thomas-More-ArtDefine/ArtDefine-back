import { Injectable } from '@nestjs/common';
import { UserSeeder } from './database/seeds/user.seeder';
import { DataSource } from 'typeorm';
import { GroupSeeder } from './database/seeds/group.seeder';
import { User } from './users/entities/user.entity';


@Injectable()
export class SeederService {
        
        private readonly userSeeder: UserSeeder;
        private readonly dataSource: DataSource;
        private readonly groupSeeder: GroupSeeder;

        private savedUsers: User[];

        constructor(userSeeder: UserSeeder, dataSource: DataSource, groupSeeder: GroupSeeder) {
            this.userSeeder = userSeeder;
            this.dataSource = dataSource;
            this.groupSeeder = groupSeeder;
        }

        async seed() {
            await this.saveUsers();
           await this.saveGroups();

                console.log('Seeding completed');
        }
    async saveGroups() {
        console.log('Seeding groups started');
        this.groupSeeder.setUsers(this.savedUsers);
        await this.groupSeeder.run(this.dataSource, null);
        console.log('Seeding groups completed');
    }
    async saveUsers() {
        console.log('Seeding users started');
        this.savedUsers = await this.userSeeder.run(this.dataSource, null);
        console.log('Seeding users completed');
    }

      

        
}

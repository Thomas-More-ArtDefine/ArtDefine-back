import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { DirectmessagesModule } from './directmessages/directmessages.module';
import { Directmessage } from './directmessages/entities/directmessage.entity';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/entities/group.entity';
import { GroupMemberModule } from './group_member/group_member.module';
import { GroupMember } from './group_member/entities/group_member.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'artdefine',
      password: 'localDB',
      database: 'artdefine',
      entities: [User,Post,Directmessage, Group, GroupMember],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    DirectmessagesModule,
    GroupMemberModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'artdefine',
      password: 'localDB',
      database: 'artdefine',
      entities: [User,Post,Directmessage],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    DirectmessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

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
import { LinksModule } from './links/links.module';
import { Link } from './links/entities/link.entity';
import { FoldersModule } from './folders/folders.module';
import { Folder } from './folders/entities/folder.entity';
import { FeedbackTemplatesModule } from './feedback_templates/feedback_templates.module';
import { FeedbackQuestionModule } from './feedback_question/feedback_question.module';
import { FeedbackQuestion } from './feedback_question/entities/feedback_question.entity';
import { FeedbackTemplate } from './feedback_templates/entities/feedback_template.entity';
import { FeedbackResultModule } from './feedback_result/feedback_result.module';
import { FeedbackResult } from './feedback_result/entities/feedback_result.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'artdefine',
      password: 'localDB',
      database: 'artdefine',
      entities: [User,Post,Directmessage, Group, GroupMember, Link, Folder, FeedbackQuestion, FeedbackTemplate, FeedbackResult],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    DirectmessagesModule,
    GroupMemberModule,
    GroupsModule,
    LinksModule,
    FoldersModule,
    FeedbackTemplatesModule,
    FeedbackQuestionModule,
    FeedbackResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

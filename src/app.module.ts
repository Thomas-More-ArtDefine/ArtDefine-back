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
import { GroupMember } from './group_members/entities/group_member.entity';
import { LinksModule } from './links/links.module';
import { Link } from './links/entities/link.entity';
import { FoldersModule } from './folders/folders.module';
import { Folder } from './folders/entities/folder.entity';
import { FeedbackTemplatesModule } from './feedback_templates/feedback_templates.module';
import { FeedbackQuestion } from './feedback_questions/entities/feedback_question.entity';
import { FeedbackTemplate } from './feedback_templates/entities/feedback_template.entity';
import { FeedbackResult } from './feedback_results/entities/feedback_result.entity';
import { GroupRank } from './group_ranks/entities/group_rank.entity';
import { Rule } from './rules/entities/rule.entity';
import { RulesModule } from './rules/rules.module';
import { GroupRanksModule } from './group_ranks/group_ranks.module';
import { FeedbackQuestionsModule } from './feedback_questions/feedback_questions.module';
import { FeedbackResultsModule } from './feedback_results/feedback_results.module';
import { GroupMembersModule } from './group_members/group_members.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'artdefine',
      password: 'localDB',
      database: 'artdefine',
      entities: [User,Post,Directmessage, Group, GroupMember, Link, Folder, FeedbackQuestion, FeedbackTemplate, FeedbackResult, GroupRank, Rule],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    DirectmessagesModule,
    GroupsModule,
    LinksModule,
    FoldersModule,
    FeedbackTemplatesModule,
    RulesModule,
    GroupRanksModule,
    FeedbackQuestionsModule,
    FeedbackResultsModule,
    GroupMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

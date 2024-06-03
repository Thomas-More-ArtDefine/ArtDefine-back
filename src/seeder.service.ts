import { Injectable } from '@nestjs/common';
import { UserSeeder } from './database/seeds/user.seeder';
import { DataSource } from 'typeorm';
import { GroupSeeder } from './database/seeds/group.seeder';
import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/group.entity';
import { GroupMembersSeeder } from './database/seeds/group_members.seeder';
import { GroupMember } from './group_members/entities/group_member.entity';
import { FolderSeeder } from './database/seeds/folder.seeder';
import { PostSeeder } from './database/seeds/post.seeder';
import { Post } from './posts/entities/post.entity';
import { Folder } from './folders/entities/folder.entity';
import { LinkSeeder } from './database/seeds/link.seeder';
import { RuleSeeder } from './database/seeds/rule.seeder';
import FeedbackTemplateSeeder from './database/seeds/feedback_template_seeder';
import { FeedbackTemplate } from './feedback_templates/entities/feedback_template.entity';
import FeedbackQuestionSeeder from './database/seeds/feedback_questions_seeder';
import FeedbackResultSeeder from './database/seeds/feedback_result_seeder';
import { FeedbackQuestion } from './feedback_questions/entities/feedback_question.entity';

@Injectable()
export class SeederService {


  private savedUsers: User[];
  private savedGroups: Group[];
  private savedFolders: Folder[];
  private savedGroupMembers: GroupMember[];
  private savedPosts: Post[];
  private savedFeedbackTemplates: FeedbackTemplate[];
  private savedFeedbackQuestions: FeedbackQuestion[];


  constructor(
    private userSeeder: UserSeeder,
    private dataSource: DataSource,
    private groupSeeder: GroupSeeder,
    private groupMembersSeeder: GroupMembersSeeder,
    private folderSeeder: FolderSeeder,
    private postSeeder: PostSeeder,
    private linkSeeder: LinkSeeder,
    private ruleSeeder: RuleSeeder,
    private feedbackTemplateSeeder: FeedbackTemplateSeeder,
    private feedbackQuestionSeeder: FeedbackQuestionSeeder,
    private feedbackResultSeeder: FeedbackResultSeeder,
  ) {}

  async seed() {
    try {
      console.log('🌱 Seeding started 🌱');
      
        await this.saveUsers(),
        await this.saveGroups(),
        await this.saveGroupsMembers(),
        await this.saveFolders(),
        await this.savePosts(),
        await this.saveLinks(),
        await this.saveRules(),
        await this.saveFeedbackTemplates(),
        await this.saveFeedbackQuestions(),
        await this.saveFeedbackResults(),
     
      console.log('🪴 Seeding completed 🪴');
    } catch (error) {
      console.error('🥀 Seeding failed 🥀', error);
    }
  }
  async saveLinks() {
    console.log('💦 Seeding links started');
    this.linkSeeder.setUsers(this.savedUsers);
    this.linkSeeder.setGroups(this.savedGroups);
    await this.linkSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding links [completed]');
  }

  async saveUsers() {
    console.log('💦 Seeding users started');
    this.savedUsers = await this.userSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding users [completed]');
  }

  async saveGroups() {
    console.log('💦 Seeding groups started');
    this.groupSeeder.setUsers(this.savedUsers);
    this.savedGroups = await this.groupSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding groups [completed]');
  }

  async saveGroupsMembers() {
    console.log('💦 Seeding group members started');
    this.groupMembersSeeder.setUsers(this.savedUsers);
    this.groupMembersSeeder.setGroups(this.savedGroups);
    this.savedGroupMembers = await this.groupMembersSeeder.run(
      this.dataSource,
      null,
    );
    console.log('🌿 Seeding group members [completed]');
  }

  async saveFolders() {
    console.log('💦 Seeding folders started');
    this.folderSeeder.setUsers(this.savedUsers);
    this.folderSeeder.setGroups(this.savedGroups);
    this.savedFolders = await this.folderSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding folders [completed]');
  }

  async savePosts() {
    console.log('💦 Seeding posts started');
    this.postSeeder.setUsers(this.savedUsers);
    this.postSeeder.setFolders(this.savedFolders);
    this.savedPosts = await this.postSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding posts [completed]');
  }

  async saveRules() {
    console.log('💦 Seeding rules started');
    this.ruleSeeder.setUsers(this.savedUsers);
    this.ruleSeeder.setGroups(this.savedGroups);
    await this.ruleSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding rules [completed]');
  }

  async saveFeedbackTemplates() {
    console.log('💦 Seeding feedback Templates started');
    this.feedbackTemplateSeeder.setPosts(this.savedPosts);
    this.savedFeedbackTemplates = await this.feedbackTemplateSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding feedback Templates [completed]');
  };


  async saveFeedbackQuestions() {
    console.log('💦 Seeding feedback questions started');
    this.feedbackQuestionSeeder.setTemplates(this.savedFeedbackTemplates);
    this.savedFeedbackQuestions = await this.feedbackQuestionSeeder.run(this.dataSource, null);
    await addQuestionstoTemplate(this.savedFeedbackTemplates, this.savedFeedbackQuestions);
    console.log('🌿 Seeding feedback questions [completed]');
  }

  async saveFeedbackResults() {
    console.log('💦 Seeding feedback results started');
    this.feedbackResultSeeder.setTemplates(this.savedFeedbackTemplates);
    this.feedbackResultSeeder.setUser(this.savedUsers[0]);
    await this.feedbackResultSeeder.run(this.dataSource, null);
    console.log('🌿 Seeding feedback results [completed]');
  }
}



async function addQuestionstoTemplate(savedFeedbackTemplates: FeedbackTemplate[], savedFeedbackQuestions: FeedbackQuestion[]) {
  for (const template of savedFeedbackTemplates) {
    const questions = savedFeedbackQuestions.filter(question => question.template_id === template.id);
    template.questions = questions;
  }
}


import { Directmessage } from 'src/directmessages/entities/directmessage.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Link } from 'src/links/entities/link.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { FeedbackResult } from 'src/feedback_results/entities/feedback_result.entity';
import { Rule } from 'src/rules/entities/rule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  user_name: string;

  @Column({ type: 'varchar', length: 50 })
  user_email: string;

  @Column({ type: 'varchar' })
  user_password: string;

  @Column({ type: 'text',default: "" })
  user_bio: string;

  @Column({ type: 'text', default: ""  })
  user_profile_picture: string;

  @Column({ type: 'text',default: ""  })
  user_banner_picture: string;

  @Column({ type: 'varchar', length: 50,default: "" })
  user_pronouns: string;

  @Column({ type: 'varchar', length: 50,default: ""  })
  user_subtitle: string;

  @Column({ type: 'date', default: new Date()  })
  user_creationdate: Date;

  @OneToMany(type => Post, post => post.user, {onDelete:'CASCADE'})
  posts: []; 

  @OneToMany(type => GroupMember, groupMember => groupMember.member, {onDelete:'CASCADE'})
  groups: [];

  @OneToMany(type => Directmessage, directmessage => directmessage.sender, {cascade: true})
  send_messages: [];

  @OneToMany(type => Directmessage, directmessage => directmessage.receiver, {cascade: true})
  received_messages: [];

  @OneToMany(type => Link, link => link.user, {onDelete:'CASCADE'})
  links: [];

  @OneToMany(type => Folder, folder => folder.user, {onDelete:'CASCADE'})
  folders: [];

  @OneToMany(type => FeedbackResult, feedback => feedback.user)
  given_feedback: [];

  @ManyToMany(type => User)
  @JoinTable()
  following: User[]

  @ManyToMany(type => Rule, {onDelete: "CASCADE"})
  @JoinTable()
  Rules: [];

}
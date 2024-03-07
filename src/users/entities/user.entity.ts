import { Directmessage } from 'src/directmessages/entities/directmessage.entity';
import { Group } from 'src/group/entities/group.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';

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

  @Column({ type: 'varchar', length: 250,default: ""  })
  user_profile_picture: string;

  @Column({ type: 'varchar', length: 250,default: ""  })
  user_banner_picture: string;

  @Column({ type: 'varchar', length: 50,default: "" })
  user_pronouns: string;

  @Column({ type: 'varchar', length: 50,default: ""  })
  user_subtitle: string;

  @Column({ type: 'date', default: new Date()  })
  user_creationdate: Date;

  @OneToMany(type => Post, post => post.user, {onDelete:'CASCADE'})
  posts: []; 

  @OneToMany(type => Group, group => group.creator)
  made_groups: [];

  @OneToMany(type => Directmessage, directmessage => directmessage.sender)
  send_messages: [];

  @OneToMany(type => Directmessage, directmessage => directmessage.receiver)
  received_messages: [];

  @ManyToMany(type => User)
  @JoinTable()
  following: User[]

}
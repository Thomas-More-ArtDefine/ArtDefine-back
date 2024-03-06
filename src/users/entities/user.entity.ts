import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  user_name: string;

  @Column({ type: 'varchar', length: 50 })
  user_email: string;

  @Column({ type: 'varchar' })
  user_password: string;

  @Column({ type: 'text',default: "" })
  user_bio: string;

  @Column({ type: 'varchar', length: 50,default: ""  })
  user_profile_picture: string;

  @Column({ type: 'varchar', length: 50,default: ""  })
  user_banner_picture: string;

  @Column({ type: 'varchar', length: 50,default: "" })
  user_pronouns: string;

  @Column({ type: 'varchar', length: 50,default: ""  })
  user_subtitle: string;

  @Column({ type: 'date'  })
  user_creationdate: Date;

  @OneToMany(type => Post, post => post.user, {onDelete:'CASCADE'})
  posts: [];

}
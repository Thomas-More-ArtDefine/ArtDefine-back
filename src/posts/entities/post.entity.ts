import { Folder } from 'src/folders/entities/folder.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User, user => user.posts, { onDelete: "CASCADE" })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ type: 'string', name: 'user_id' })
    user_id: string;

    @Column({ type: 'text' })
    post_content: string;

    @Column({ type: 'varchar', length: 50 })
    post_title: string;

    @Column({ type: 'varchar', length: 50, default: ""  })
    post_tags: string;

    @Column({ type: 'text', default: "" })
    post_description: string;

    @Column({ type: 'date', default: new Date()  })
    post_uploaddate: Date;

    @ManyToMany(type => Folder, folder => folder.posts)
    folders: Folder[]
}

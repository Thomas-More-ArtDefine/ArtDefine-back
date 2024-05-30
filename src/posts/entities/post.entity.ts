import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';
import { Folder } from 'src/folders/entities/folder.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { visibility } from 'src/app.controller';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'string', name: 'user_id' })
    user_id: string;

    @ManyToOne(type => User, user => user.posts, { onDelete: "CASCADE" })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ type: 'text' })
    post_content: string;

    @Column({ type: 'varchar', length: 50 })
    post_title: string;

    @Column({ type: 'varchar', length: 50, default: ""  })
    post_tags: string;

    @Column({ type: 'text', default: "" })
    post_description: string;

    @Column({
        type: "enum",
        enum: visibility,
        default: visibility.PRIVATE
    })
    post_visibility: visibility;

    @Column({ type: 'date', default: new Date()  })
    post_uploaddate: Date;

    @ManyToMany(type => Folder, folder => folder.posts, {onDelete:'CASCADE'})
    folders: Folder[]

    @OneToOne(type => FeedbackTemplate, template => template.post, {cascade: true})
    feedback_template: FeedbackTemplate
}

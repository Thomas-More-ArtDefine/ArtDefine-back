import { Group } from 'src/groups/entities/group.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { visibility } from 'src/app.controller';


@Entity()
export class Folder {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid', default: null })
    user_id: string;
    
    @ManyToOne(type => User, user => user.folders, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ type: 'uuid', default: null })
    group_id: string;

    @ManyToOne(type => Group, group => group.folders, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'group_id'})
    group: Group;

    @Column({ type: 'varchar', length: 100 })
    folder_name: string;

    @Column({ type: 'text', default: "" })
    folder_description: string;

    @Column({ type: 'bool', default: false })
    folder_archived: boolean;

    @Column({
        type: "enum",
        enum: visibility,
        default: visibility.PRIVATE
    })
    folder_visibility: visibility;

    @ManyToMany(type => Post, post => post.folders)
    @JoinTable()
    posts: Post[];
}

import { Folder } from 'src/folders/entities/folder.entity';
import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';
import { Link } from 'src/links/entities/link.entity';
import { Rule } from 'src/rules/entities/rule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 50 })
    group_name: string;

    @Column({ type: 'char', length: 50, name: 'creator_id' })
    creator_id: string;

    @Column({ type: 'varchar', length: 50, default: "" })
    creator_name: string;

    @Column({ type: 'date', default: new Date()  })
    group_creationdate: Date;

    @Column({ type: 'int', default: 5  })
    group_userlimit: number;

    @Column({ type: 'text', default: "" })
    group_bio: string;

    @Column({ type: 'text', default: "" })
    group_profile_picture: string;

    @Column({ type: 'text', default: "" })
    group_banner_picture: string;

    @Column({ type: 'bool', default: false })
    group_queued_deletion: boolean;

    @Column({ type: 'date', default: null })
    group_queued_deletion_date: Date;

    @OneToMany(type => GroupMember, groupMember => groupMember.group, {onDelete: "CASCADE"})
    members: GroupMember[];

    @OneToMany(type => Link, link => link.group, {onDelete: "CASCADE"})
    links: Link[];

    @OneToMany(type => Folder, folder => folder.group, {onDelete: "CASCADE"})
    folders: Folder[];

    // @ManyToMany(type => Rule, {onDelete: "CASCADE"})
    // @JoinTable()
    // Rules: Rule[];

    @OneToMany(type => Rule, rule => rule.group, {onDelete: "CASCADE"})
    rules: Rule[];

    @OneToMany(type => GroupRank, rank => rank.group)
    ranks: GroupRank[];
}


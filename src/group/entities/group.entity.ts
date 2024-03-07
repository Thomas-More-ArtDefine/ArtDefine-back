import { GroupMember } from 'src/group_member/entities/group_member.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 50 })
    group_name: string;

    @Column({ type: 'uuid', name: 'creator_id' })
    creator_id: string;

    @ManyToOne(type => User, user => user.made_groups)
    @JoinColumn({name: 'creator_id'})
    creator: User;

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

    @OneToMany(type => GroupMember, groupMember => groupMember.group)
    members: [];
}

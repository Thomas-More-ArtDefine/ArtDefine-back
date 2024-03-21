import { GroupRank } from 'src/group_ranks/entities/group_rank.entity';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class GroupMember {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid', name: 'member_id' })
    member_id: string;

    @ManyToOne(type => User, user => user.groups)
    @JoinColumn({name: 'member_id'})
    member: User;

    @Column({ type: 'uuid', name: 'group_id' })
    group_id: string;

    @ManyToOne(type => Group, group => group.members, {onDelete: "CASCADE"})
    @JoinColumn({name: 'group_id'})
    group: Group;

    @Column({ type: 'date', default: new Date()  })
    member_join_date: Date;

    @Column({ type: 'uuid', name: 'grouprank_id', default: null })
    grouprank_id: string;

    @ManyToOne(type => GroupRank, rank => rank.group_members)
    @JoinColumn({name: 'grouprank_id'})
    rank: GroupRank
}

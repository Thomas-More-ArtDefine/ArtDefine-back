import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

export enum group_rank {
    OWNER = "owner",
    ADMIN = "admin",
    MODERATOR = "moderator",
    TRUSTEDMEMBER = "trusted_member",
    MEMBER = "member",
    NEWMEMBER = "new_member",
    GUEST = "guest"
}

@Entity()
export class GroupRank {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(type => GroupMember, groupMember => groupMember.rank)
    group_members: [];

    @Column({ type: 'uuid', name: 'group_id' })
    group_id: string;

    @ManyToOne(type => Group, group => group.ranks, {onDelete: "CASCADE"})
    @JoinColumn({name: 'group_id'})
    group: Group

    @Column({
        type: "enum",
        enum: group_rank,
        default: group_rank.MEMBER
    })
    rank: group_rank;

    @Column({ type: 'bool', default: false })
    default_rank: boolean; 

}

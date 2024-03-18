import { GroupMember } from 'src/group_members/entities/group_member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

export enum group_rank {
    CREATOR = "creator",
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

    @Column({ type: 'uuid', default: null })
    groupmember_id: string;

    @OneToOne(type => GroupMember, group_member => group_member.rank)
    @JoinColumn({name: 'groupmember_id'})
    group_member: GroupMember;

    @Column({
        type: "enum",
        enum: group_rank,
        default: group_rank.GUEST
    })
    rank: group_rank;

}

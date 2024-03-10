import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid', default: null })
    user_id: string;
    
    @ManyToOne(type => User, user => user.links, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ type: 'uuid', default: null })
    group_id: string;

    @ManyToOne(type => Group, group => group.links, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'group_id'})
    group: Group;

    @Column({ type: 'varchar', length: 100 })
    link_name: string;

    @Column({ type: 'varchar', length: 264 })
    link_url: string;
}

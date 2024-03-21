import { Group } from "src/groups/entities/group.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rule {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 50 })
    rule_name: string;

    @Column({ type: 'text' })
    rule_value: string;

    @Column({ type: 'bool' })
    is_active: boolean;

    @Column({ type: 'uuid', default: null, nullable: true })
    group_id: string;

    @ManyToOne(type => Group, group => group.rules, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'group_id'})
    group: Group;

    @Column({ type: 'uuid', default: null, nullable: true })
    user_id: string;

    @ManyToOne(type => User, user => user.rules, { onDelete: 'CASCADE' })
    @JoinColumn({name: 'user_id'})
    user: User;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

export enum questionType {
    PINS = "pins",
    STARS = "stars",
    BULLETPOINTS = "bulletpoints",
    OPEN = "open"
}

@Entity()
export class FeedbackQuestion {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 100 })
    question_title: string;

    @Column({
        type: "enum",
        enum: questionType
    })
    question_type: questionType;

    @Column({ type: 'uuid', name: 'template_id' })
    template_id: string;

    @ManyToOne(type => FeedbackTemplate, template => template.questions)
    @JoinColumn({name: 'template_id'})
    template: FeedbackTemplate;
}

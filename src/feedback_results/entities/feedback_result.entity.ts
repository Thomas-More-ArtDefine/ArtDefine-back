import { FeedbackQuestion } from 'src/feedback_questions/entities/feedback_question.entity';
import { FeedbackTemplate } from 'src/feedback_templates/entities/feedback_template.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class FeedbackResult {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'json' })
    feedback_result: JSON;

    @Column({ type: 'uuid', default: null, nullable: true })
    user_id: string;

    @ManyToOne(type => User, user => user.given_feedback, {onDelete:'SET NULL'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({ type: 'uuid', default: null })
    question_id: string;

    @ManyToOne(type => FeedbackQuestion, question => question.id, {onDelete:'CASCADE'})
    @JoinColumn({name: 'question_id'})
    question: FeedbackQuestion;
}

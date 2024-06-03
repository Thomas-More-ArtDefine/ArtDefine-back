import { FeedbackQuestion } from 'src/feedback_questions/entities/feedback_question.entity';
import { FeedbackResult } from 'src/feedback_results/entities/feedback_result.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class FeedbackTemplate {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(type => FeedbackQuestion, question => question.template, {
        cascade: ['insert', 'update'], 
        eager: true, 
    } ) 
    questions: FeedbackQuestion[];

    @Column({ type: 'uuid', default: null, nullable: false })
    post_id: string;

    @OneToOne(type => Post, post => post.feedback_template, {onDelete: "CASCADE"})
    @JoinColumn({name: 'post_id'})
    post: Post;

    
}

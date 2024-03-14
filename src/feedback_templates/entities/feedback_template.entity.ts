import { FeedbackQuestion } from 'src/feedback_questions/entities/feedback_question.entity';
import { FeedbackResult } from 'src/feedback_results/entities/feedback_result.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class FeedbackTemplate {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToMany(type => FeedbackQuestion, question => question.template)
    questions: FeedbackQuestion[];

    @OneToOne(type => Post, post => post.feedback_template, {onDelete: "CASCADE"})
    post: Post;

    @OneToMany(type => FeedbackResult, feedback => feedback.template)
    feedback: FeedbackResult[];
}

import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Directmessage {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'string', name: 'sender_id', default: null })
    sender_id: string;

    @ManyToOne(type => User, user => user.send_messages)
    @JoinColumn({name: 'sender_id'})
    sender: User;

    @Column({ type: 'string', name: 'receiver_id', default: null })
    receiver_id: string;

    @ManyToOne(type => User, user => user.received_messages)
    @JoinColumn({name: 'receiver_id'})
    receiver: User;

    @Column({ type: 'text' })
    message_content: string;

    @Column({ type: 'timestamp', default: new Date() })
    message_date: Date;
}
 
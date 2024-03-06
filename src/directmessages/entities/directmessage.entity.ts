import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Directmessage {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'uuid', name: 'sender_id' })
    sender_id: string;

    @ManyToOne(type => User, user => user.send_messages)
    @JoinColumn({name: 'sender_id'})
    sender: User;

    @Column({ type: 'uuid', name: 'receiver_id' })
    receiver_id: string;

    @ManyToOne(type => User, user => user.received_messages)
    @JoinColumn({name: 'receiver_id'})
    receiver: User;

    @Column({ type: 'text' })
    message_content: string;

    @Column({ type: 'timestamp', default: new Date() })
    message_date: Date;
}

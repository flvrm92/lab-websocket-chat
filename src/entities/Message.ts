import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User';

@Entity('messages')
class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    adminId: string;

    @Column()
    text: string
    
    @JoinColumn({ name: 'userId'})
    @ManyToOne(() => User)
    User: User;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id)  {
            this.id = uuid();
        }
    }
}

export {
    Message
}
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User';

@Entity('connections')
class Connection {
    @PrimaryColumn()
    id: string;

    @Column()
    adminId: string;

    @Column()
    socketId: string;

    @JoinColumn({ name: 'userId'})
    @ManyToOne(() => User)
    User: User;

    @Column()
    userId: string;

    @CreateDateColumn()    
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor() {
        if (!this.id)
            this.id = uuid();
    }

}

export{
    Connection
};
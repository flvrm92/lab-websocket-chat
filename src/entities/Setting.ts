import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('settings')
class Setting {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    constructor() {
        if (!this.id)  {
            this.id = uuid();
        }
    }
}

export { 
    Setting
}
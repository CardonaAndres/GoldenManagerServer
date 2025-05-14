import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'stores' })
export class Store {
    @PrimaryGeneratedColumn()
    store_ID: string;

    @Column()
    name: string;

    @Column()
    description : string;

    @Column({ type : 'text' })
    logo_url : string;

    @Column()
    location : string;

    @Column()
    status_ID : number;
    
    @Column()
    created_at : Date = new Date();


    @ManyToOne(() => User, user => user.user_ID)
    @JoinColumn({ name : 'user_owner_ID' })
    user_owner_ID : User;

}

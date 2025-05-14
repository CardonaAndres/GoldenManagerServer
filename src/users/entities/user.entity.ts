import { Store } from "src/stores/entities/store.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name : 'users' })
export class User {
    @PrimaryColumn()
    user_ID : string;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    cellphone : string;

    @Column()
    password : string;

    @Column()
    role_ID : number;

    @Column()
    status_ID : number;

    @Column()
    created_at : Date = new Date();

    @OneToMany(() => Store, store => store.user_owner_ID)
    @JoinColumn({ name : 'user_owner_ID' })
    stores : Store[]
}

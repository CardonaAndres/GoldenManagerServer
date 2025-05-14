import { Column, Entity, PrimaryColumn } from "typeorm";

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
}

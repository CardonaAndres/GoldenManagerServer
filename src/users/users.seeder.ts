import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Roles, UserStatus } from './ts/enums';
import { errorHandler } from 'src/app/utils/error.handler';

@Injectable()
export class UserSeedService implements OnModuleInit {
    constructor(@InjectRepository(User) private readonly conn: Repository<User>) {}

    async onModuleInit() {
        try {
            const user = await this.conn.findOneBy({ user_ID : '1032011946' })

            if(!user){
                await this.conn.save({
                    user_ID : '1032011946',
                    name : 'Andrés Cardona',
                    email : '11cardona31@gmail.com',
                    cellphone : '3012524648',
                    password : await bcrypt.hash('As1032011946@', 10),
                    role_ID : Roles.ADMIN,
                    status_ID : UserStatus.ACTIVE,
                    created_at : new Date(),
                })
            
            }    
            
        } catch (err) {
            errorHandler(err);
        }
    }
}
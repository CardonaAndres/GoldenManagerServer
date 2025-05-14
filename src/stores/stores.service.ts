import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StoresService {
 constructor(
    @InjectRepository(Store) private readonly conn : Repository<Store>,
    private readonly userService : UsersService
){}

 async registerStore(body : CreateStoreDto, logo : Express.Multer.File, req : any) {
    const { user } = await this.userService.getUserByProperty('user_ID', req.user.user_ID);

    if(!user) throw { message : 'No se ha encontrado el usuario', status : 404 }

    body.user_owner_ID = req.user.user_owner_ID

    if(!logo) throw { message : 'No se ha subido el logo / imagen', status : 400 }

    body.logo_url = logo.filename;
    
    const store = this.conn.create({
        ...body,
        user_owner_ID : user
    });

    const storeCreated = await this.conn.save(store);

    return {
        message : 'Tienda registrada correctamente',
        storeCreated
    }

 }

}

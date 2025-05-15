import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SERVER_URL } from 'src/app/configs/config';
import { PaginationDto } from 'src/app/dtos/pagination.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store) private readonly conn : Repository<Store>,
        private readonly userService : UsersService
    ){}

    async getAllStores(pagination : PaginationDto){
        const { limit = 18, page = 1 } = pagination;
        const [ stores, total ] = await this.conn.findAndCount({
            take : limit,
            skip : (page - 1) * limit,
            relations : {
                user_owner_ID : true
            }
        }); 
        
        stores.map(store => {
            store.user_owner_ID.password = ""
        });

        return {
            message : 'Tarea éxitosa',
            stores,
            meta : {
                page,
                limit,
                total,
                total_pages : Math.ceil(total / limit),
            }
        }
    }

    async getAllMyStores(user_ID : string, pagination : PaginationDto){
        const { limit = 18, page = 1 } =  pagination;
        const { user } = await this.userService.getUserByProperty('user_ID', user_ID);

        if(!user) throw { message : 'El usuario no existe', status : 404 }

        const [ stores, total ] = await this.conn.findAndCount({
            take : limit,
            skip : (page - 1) * limit,
            where : {
                user_owner_ID : user
            }
        });

        const {password, ...userWithoutPassword } = user;

        return {
            message : stores.length >= 1 ? 'Tiendas encontradas' : 'No tienes tiendas, agrega una!',
            user : userWithoutPassword,
            stores,
            meta : {
                page,
                limit,
                total,
                total_pages : Math.ceil(total / limit),
            }
        }

    }

    async registerStore(body : CreateStoreDto, logo : Express.Multer.File, req : any) {
        const { user } = await this.userService.getUserByProperty('user_ID', req.user.user_ID);

        if(!user) throw { message : 'No se ha encontrado el usuario', status : 404 }

        body.user_owner_ID = req.user.user_owner_ID

        if(!logo) throw { message : 'No se ha subido el logo / imagen', status : 400 }

        body.logo_url = SERVER_URL + '/stores/uploads/logos/' + logo.filename;

        const getAllStoresByUser = await this.conn.find({
            where : {
                user_owner_ID : user
            }
        });

        if(getAllStoresByUser.length >= 5) 
            throw { message : 'Se pueden tener hasta maximo 5 tiendas', status : 400 }
        
        const store = this.conn.create({
            ...body,
            user_owner_ID : user
        });

        const storeCreated = await this.conn.save(store);

        storeCreated.user_owner_ID.password = ""

        return {
            message : 'Tienda registrada correctamente',
            storeCreated
        }

    }

    async updateStore(store_ID : string, body : UpdateStoreDto, req : any, logo: Express.Multer.File){

        const { user } = await this.userService.getUserByProperty('user_ID', req.user.user_ID);
        if (!user) throw { message: 'No se ha encontrado el usuario', status: 404 };
        
        // Buscar la tienda a actualizar
        const store = await this.conn.findOne({
            where: {
                store_ID,
                user_owner_ID: user
            },
            relations: ['user_owner_ID'] // Si es necesario para después limpiar password
        });
        
        if (!store) throw { message: 'Tienda no encontrada o no pertenece al usuario', status: 404 };

        if (logo) {
            // Eliminar el logo anterior si existe
            if (store.logo_url) {
                const UPLOADS_LOGO_PATH = path.join(process.cwd(), 'src', 'stores', 'uploads', 'logos');
                const oldLogoPath = path.join(
                    UPLOADS_LOGO_PATH,
                    path.basename(store.logo_url)
                );
                
                try {
                    await fs.promises.access(oldLogoPath, fs.constants.F_OK); // Verifica si existe
                    await fs.promises.unlink(oldLogoPath); // Elimina
                } catch (err) {
                    console.warn('No se pudo eliminar el archivo:', oldLogoPath, err.message);
                }
            }

            // Asignar nuevo logo
            body.logo_url = SERVER_URL + '/stores/uploads/logos/' + logo.filename;
        }

        Object.assign(store, body);

        await this.conn.update(store_ID, {
            ...store
        })
        
        return {
            message: 'Tienda actualizada correctamente'
        };
    }

}

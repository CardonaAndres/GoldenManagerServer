import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly conn : Repository<User>){}

  async registerUser(user : CreateUserDto){

    return {
      message : 'Usuario creado con éxito',
    }
  }

 async getUserByProperty(property : string, value : string){
    const propertiesAllowed = Object.keys(new User());

    if(!propertiesAllowed.includes(property))
      throw { message : 'Esta propiedad no es valida', status : 400 };

    const user = this.conn.findOne({ where : { [property] : value } });

    if(!user)
      throw { message : 'Usuario no encontrado', status : 404 };
    
    return {
      mesage : 'Usuario encontrado',
      user 
    }

  }

}

import * as bcrypt from 'bcrypt-ts';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { ChangePasswordDto } from 'src/auth/dto/change.password.dto';
import { PaginationDto } from 'src/app/dtos/pagination.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly conn : Repository<User>){}

  async profile(req : any){
    const user = await this.conn.findOne({
      where : { user_ID : req.user.user_ID }
    });

    if(!user) throw { message : 'Usuario no encontrado', status : 404 };

    // Eliminar contraseña del objeto de respuesta
    const { password, ...userWithoutPassword } = user;

    return {
      message : 'Usuario encontrado',
      user : userWithoutPassword
    }
  }

  async AllUsers(pagination : PaginationDto, req : any) {
    const { page, limit } = pagination;

    const [ users, total ] = await this.conn.findAndCount({
      take : limit,
      skip : (page - 1) * limit,
      where : {
        user_ID : Not(req.user.user_ID)
      }
    }); 

    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      message : 'Usuarios encontrados',
      users : usersWithoutPassword,
      meta: {
        total,
        page,
        limit,
        lastPage : Math.ceil(total / limit),
      }
    }
    
  }

  async registerUser(user : CreateUserDto){
    // Verificar correo
    const UserExistByEmail = await this.conn.findOne({
      where : { email : user.email }
    });

    if(UserExistByEmail) throw { message : 'El correo ya esta registrado', status : 400 };

    // Verificar celular
    const UserExistByCellphone = await this.conn.findOne({
      where : { cellphone : user.cellphone }
    });

    if(UserExistByCellphone) throw { message : 'El celular ya esta registrado', status : 400 };

    // Verificar ID de usuario
    const UserExistByID = await this.conn.findOne({
      where : { user_ID : user.user_ID }
    });

    if(UserExistByID) throw { message : 'El ID de usuario ya esta registrado', status : 400 };

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    // Crear usuario
    const newUser = this.conn.create(user);
    await this.conn.save(newUser);

    // Eliminar contraseña del objeto de respuesta
    const { password, ...userWithoutPassword } = newUser;

    return {
      message : 'Usuario creado con éxito',
      user : userWithoutPassword
    }
  }

  async getUserByProperty(property : string, value : string){
    const propertiesAllowed = Object.keys(new User());

    if(!propertiesAllowed.includes(property))
      throw { message : 'Esta propiedad no es valida', status : 400 };

    const user = await this.conn.findOne({ where : { [property] : value } });

    if(!user) throw { message : 'Usuario no encontrado', status : 404 };
    
    return {
      mesage : 'Usuario encontrado',
      user 
    }

  }

  async changePassword(userData : ChangePasswordDto) {
    const user = await this.conn.findOne({
      where : {
        email : userData.email
      }
    });

    if(!user) throw { message : 'El usuario no existe', status : 404 }

    const isSamePassword = await bcrypt.compare(
      userData.newPassword, user.password
    );

    if(!isSamePassword) {
      await this.conn.update(user.user_ID,{
        ...user,
        password : await bcrypt.hash(userData.newPassword, 10)
      });
    }

    return {
      status : true,
      message : 'Contraseña actualizada correctamente'
    }

  }

  async updateUser(user_ID : string, body : UpdateUserDto){
    
    const userExist = await this.conn.findOne({
      where : { user_ID}
    });

    if(!userExist) 
      throw { message : 'El usuario no existe', status : 404 };

    if(body.user_ID && body.user_ID !== userExist.user_ID) 
      throw { message : 'No puedes cambiar documento, por favor hablar con soporte', status : 400 };
 
    const user = Object.assign(userExist, body);

    // Verificar correo
    const emailInUse = await this.conn.findOne({
      where : { 
        email : user.email,
        user_ID : Not(user_ID) 
      }
    });

    if(emailInUse) throw { message : 'El correo ya esta registrado', status : 400 };

    // Verificar celular
    const cellphoneInUse = await this.conn.findOne({
      where : { 
        email : user.cellphone,
        user_ID : Not(user_ID) 
      }
    });

    if(cellphoneInUse) throw { message : 'El celular ya esta registrado', status : 400 };

    // Actualizar usuario
    await this.conn.update(user_ID, {
      name : user.name,
      email : user.email,
      cellphone : user.cellphone,
    });

    const { password, ...updatedUser  } = user;

    return {
      message : 'Usuario actualizado correctamente',
      user : updatedUser
    }

  }
}
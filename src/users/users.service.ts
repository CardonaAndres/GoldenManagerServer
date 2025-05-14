import * as bcrypt from 'bcrypt-ts';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from 'src/auth/dto/change.password.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly conn : Repository<User>){}

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
}

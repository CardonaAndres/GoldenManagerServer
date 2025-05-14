import * as bcrypt from 'bcrypt-ts';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change.password.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginData : LoginDto){
        const { user } = await this.userService.getUserByProperty('email', loginData.email);
        if(!user) throw { message : 'Usuario no encontrado', status : 404 };

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
        if(!isPasswordValid) throw { message : 'Contraseña incorrecta', status : 401 };

        const { password, ...userWithoutPassword } = user;
        const token = await this.jwtService.signAsync(userWithoutPassword);

        return {
            message : 'Bienvenido, nos alegra verte de nuevo',
            user : userWithoutPassword,
            token
        }
    }

    async register(userData : CreateUserDto) {
        const { user } = await this.userService.registerUser(userData);
        const token = await this.jwtService.signAsync(user)

        return {
            message : 'Usuario registrado con éxito',
            user,
            token
        }
    }

    async changePassword(userData : ChangePasswordDto) {
        const userUpdated = await this.userService.changePassword(userData);

        if(!userUpdated.status)
            throw { message : 'Hubo un error, volver a intentar más tarde', status : 400 }

        return {
            message : 'Contraseña actualizada correctamente'
        }

    }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService : UsersService) {}

    async register(userData : CreateUserDto) {

        const user = await this.userService.registerUser(userData);

        return {
            message : 'Usuario registrado con éxito',
        }
    }
}

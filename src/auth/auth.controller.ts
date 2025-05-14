import { Controller, Post, Body, HttpCode, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorHandler } from 'src/app/utils/error.handler';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  @ApiOperation({ summary : 'Iniciar sesión' })
  async login(@Body() body : LoginDto){
    try {
      return await this.authService.login(body);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Post('/register')
  @ApiOperation({ summary : 'Registrar un usuario' })
  async register(@Body() body: CreateUserDto) {
    try {
      return await this.authService.register(body)
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Patch('/change-password')
  @ApiOperation({ summary : 'Actualizar contraseña' })
  async changePassword(@Body() body: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(body);
    } catch (err : any) {
      errorHandler(err);
    }
  }
}

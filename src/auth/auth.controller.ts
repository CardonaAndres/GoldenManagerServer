import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { errorHandler } from 'src/app/utils/error.handler';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login() {
    try {

    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    try {
      return await this.authService.register(body)
    } catch (err : any) {
      errorHandler(err);
    }
  }


}

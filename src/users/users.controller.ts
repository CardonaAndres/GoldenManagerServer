import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { errorHandler } from 'src/app/utils/error.handler';
import { ApiOperation } from '@nestjs/swagger';
import { CheckAdminRoleGuard } from 'src/app/guards/check.role.admin.guard';
import { PaginationDto } from 'src/app/dtos/pagination.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @ApiOperation({ summary : 'Obtener perfil de usuario', description : 'Perfil del usuario' })
  async profile(@Req() req : any) {
    try {
      return await this.usersService.profile(req);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Get('/all')
  @ApiOperation({ summary : 'Obtener todos los usuarios', description : 'Solo para administradores' })
  @UseGuards(CheckAdminRoleGuard)
  async AllUsers(@Query() pagination : PaginationDto, @Req() req : any){
    try {
      return await this.usersService.AllUsers(pagination, req);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Patch('/:user_ID')
  async updateUser(@Param('user_ID') user_ID : string, @Body() user : UpdateUserDto){
    try {
        return await this.usersService.updateUser(user_ID, user);
    } catch (err : any) {
      errorHandler(err);
    }
  }
  
}

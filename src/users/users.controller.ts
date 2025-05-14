import { Controller, Get, Body, Patch, UseGuards, Req, Query } from '@nestjs/common';
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
      return await this.usersService.allUsers(pagination, req);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Get('/all/without-paginate')
  @ApiOperation({ 
    summary : 'Obtener todos los usuarios sin paginacion', description : 'Solo para administradores' 
  })
  @UseGuards(CheckAdminRoleGuard)
  async AllUsersWithoutPaginate(){
    try {
      return await this.usersService.allUsersWithoutPagination();
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Patch('/')
  @ApiOperation({ summary : 'Actualizar usuario' })
  async updateUser(@Body() user : UpdateUserDto, @Req() req : any){
    try {
        return await this.usersService.updateUser(req.user.user_ID, user);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  // El administrador podra actualizar cualquier usuario, ademas de su estado, rol y número de documento
  @Patch('/by-admin/')
  @ApiOperation({ summary : 'Actualizar usuario por admin', description : 'Solo para administradores' })
  @UseGuards(CheckAdminRoleGuard)
  async updateUserByAdmin(@Body() user : UpdateUserDto){
    try {
        return await this.usersService.updateUserByAdmin(user);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Patch('/inactive')
  @ApiOperation({ summary : 'Desactivar (DESACTIVAR) usuario' })
  async inactiveUser(@Req() req : any){
    try {
      return await this.usersService.inactiveUser(req.user.user_ID);
    } catch (err : any) {
      errorHandler(err);
    }
  }
  
}

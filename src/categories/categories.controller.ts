import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CheckAdminRoleGuard } from 'src/app/guards/check.role.admin.guard';
import { errorHandler } from 'src/app/utils/error.handler';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary : 'Obtener todas las categorias de los productos' })
  findAll() {
    try {

    } catch (err : any) {
      errorHandler(err)
    }
  }

  @Post()
  @UseGuards(CheckAdminRoleGuard)
  @ApiOperation({ summary : 'Crear una nueva categoria', description : 'SOLO ADMINS' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto)
    } catch (err : any) {
      errorHandler(err)
    }
  }

  @Patch(':id')
  @UseGuards(CheckAdminRoleGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {

    } catch (err : any) {
      errorHandler(err)
    }
  }

  @Delete(':id')
  @UseGuards(CheckAdminRoleGuard)
  remove(@Param('id') id: string) {
    try {

    } catch (err : any) {
      errorHandler(err)
    }
  }
}

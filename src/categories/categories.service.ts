import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly conn : Repository<Category>){}

  findAll() {
    return `This action returns all categories`;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.conn.create(createCategoryDto);
    const categorySaved = await this.conn.save(category);

    return {
      message : 'Categoria creada correctamente',
      category : categorySaved
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

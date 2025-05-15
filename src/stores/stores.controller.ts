import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { errorHandler } from 'src/app/utils/error.handler';
import { ApiOperation } from '@nestjs/swagger';
import { CheckSellerGuard } from './guards/check.seller.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, logoStorage } from '../app/configs/multer';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query, 
  Req, 
  UploadedFile, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiOperation({ summary : 'Obtener todas las tiendas' })
  async getAllStores(@Query() pagination : PaginationDto){
    try {
      return await this.storesService.getAllStores(pagination)
    } catch (err : any){
      errorHandler(err);
    }
  }

  @Get('/my-stores')
  @UseGuards(CheckSellerGuard)
  @ApiOperation({ 
    summary : 'Obtener todas las tiendas del vendedor', description : 'Solo para vendedores' 
  })
  async getAllMyStores(@Req() req : any, @Query() pagination : PaginationDto){
    try {
      return await this.storesService.getAllMyStores(req.user.user_ID, pagination)
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Post()
  @UseGuards(CheckSellerGuard)
  @ApiOperation({ summary : 'Registrar una nueva tienda', description : 'Solo para vendedores' })
  @UseInterceptors(FileInterceptor('logo',{
    storage: logoStorage('src/stores/uploads/logos'),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: imageFileFilter
  }))
  async registerStore(
    @Body() body: CreateStoreDto,
    @UploadedFile() logo : Express.Multer.File,
    @Req() req : any
  ) {
    try {
      return await this.storesService.registerStore(body, logo, req);
    } catch (err : any) {
      errorHandler(err);
    }
  }

  @Patch('/:store_ID')
  @UseGuards(CheckSellerGuard)
  @ApiOperation({ summary: 'Actualizar una tienda', description: 'Solo para vendedores' })
  @UseInterceptors(FileInterceptor('logo',{
    storage: logoStorage('src/stores/uploads/logos'),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: imageFileFilter
  }))
  async updateStore(
    @Param('store_ID') store_ID: string,
    @Body() body: UpdateStoreDto,
    @UploadedFile() logo: Express.Multer.File,
    @Req() req: any
  ){
    try {
      return await this.storesService.updateStore(store_ID, body, req, logo);
    } catch (err: any) {
      errorHandler(err);
    }
  }

  @Delete('/:store_ID')
  @UseGuards(CheckSellerGuard)
  @ApiOperation({ summary : 'Eliminar tienda', description : 'Solo para administradores' })
  async deleteStore(@Param('store_ID') store_ID : string, @Req() req : any){
    try {
        return this.storesService.deleteStrore(store_ID, req.user.user_ID);
    } catch (err: any) {
      errorHandler(err);
    }
  }

}

import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { errorHandler } from 'src/app/utils/error.handler';
import { ApiOperation } from '@nestjs/swagger';
import { CheckSellerGuard } from './guards/check.seller.guard';
import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, logoStorage } from '../app/configs/multer';

@UseGuards(AuthGuard)
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(CheckSellerGuard)
  @ApiOperation({ summary : 'Registrar una nueva tienda' })
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


}

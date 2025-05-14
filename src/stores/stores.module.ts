import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Store } from './entities/store.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    MulterModule.register({
      dest : 'src/stores/uploads/'
    }),
    UsersModule
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}

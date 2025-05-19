import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CREDENTIALS } from './app/configs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : DB_CREDENTIALS.type,
      host : DB_CREDENTIALS.host,
      port : DB_CREDENTIALS.port,
      username : DB_CREDENTIALS.username,
      password : DB_CREDENTIALS.password,
      database : DB_CREDENTIALS.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize : DB_CREDENTIALS.synchronize,
      autoLoadEntities : DB_CREDENTIALS.autoLoadEntities,
      logging : false,
    }),
    AuthModule,
    UsersModule,
    StoresModule,
    ProductsModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

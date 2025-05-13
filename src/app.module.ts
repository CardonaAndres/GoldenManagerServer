import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CREDENTIALS } from './app/configs/config';

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
      logging : true,
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

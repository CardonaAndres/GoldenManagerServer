import * as morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CLIENTS_ORIGINS, PORT } from './app/configs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('GoldenManager API')
  .setDescription(
    [
      'API oficial de **GoldenManager**, una plataforma web en tiempo real para el monitoreo, análisis, predicción y comercialización del precio del oro en Colombia.',
      '',
      'Incluye funcionalidades como:',
      '- Obtención de precios en tiempo real.',
      '- Análisis estadístico y modelos de inteligencia artificial (Prophet, LSTM).',
      '- Alertas personalizadas y notificaciones automáticas (email, WhatsApp, SMS).',
      '- Visualización de datos históricos y generación de reportes.',
      '- Módulo comercial (marketplace) para joyerías e inversores.',
      '',
      'Autenticación vía JWT (Bearer Token) requerida para la mayoría de los endpoints.',
    ].join('\n')
  )
  .setVersion('1.0.0.0')
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.use(morgan('dev'));
  app.setGlobalPrefix('API');

  app.enableCors({
    origin: CLIENTS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials : true
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

main();

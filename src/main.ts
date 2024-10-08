import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use('/uploads', express.static('uploads'));
  // Listen on all interfaces
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();

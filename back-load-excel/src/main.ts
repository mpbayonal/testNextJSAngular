import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as multipart from '@fastify/multipart';
import { AppModule } from './app.module';

async function bootstrap() {
  
const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();



  await app.listen(3000);
}
bootstrap();

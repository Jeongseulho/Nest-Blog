import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  await app.listen(serverConfig.port);
  Logger.log(`Application listening on port ${serverConfig.port}`);
}
bootstrap();

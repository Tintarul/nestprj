import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join('./views'));
  app.useStaticAssets(join('./views/public/css'));
  app.use(cookieParser());
  app.use(
    session({
      secret: 'SECRETKEYDADA',
      resave: true,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();

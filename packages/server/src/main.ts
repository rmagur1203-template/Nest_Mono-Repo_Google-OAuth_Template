import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swagger } from './swagger';
import { NextFunction, Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const config = app.get(ConfigService);

  const servicePort = config.get<string>('PORT', '3000');
  const NODE_ENV = config.get<string>('NODE_ENV', 'production');

  app.use(cookieParser());
  app.enableCors({
    origin:
      config.get<string>('CORS_ORIGIN')?.split(',') ??
      ((_, cb) => cb(null, true)),
    methods: config.get<string>('CORS_METHODS', 'GET,PUT,POST,PATCH,DELETE'),
    credentials: config.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: config.get<boolean>('CORS_PREFLIGHT', false),
    optionsSuccessStatus: config.get<number>('CORS_OPTIONS_STATUS', 204),
  });

  if (NODE_ENV === 'development') {
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('X-Powered-By', 'NestJS');
      Logger.debug(`${req.method} ${req.url}`, 'Request');
      next();
    });
  }

  if (config.get<boolean>('TRUST_PROXY', false)) {
    app.set('trust proxy', 1);
  }

  if (config.get('GLOBAL_PREFIX', false)) {
    app.setGlobalPrefix(config.get<string>('GLOBAL_PREFIX', 'api'));
  }

  if (config.get<boolean>('SWAGGER_ENABLED', NODE_ENV === 'development')) {
    await swagger(app);
  }

  await app.listen(servicePort);

  Logger.log(
    `Server is running on localhost:${servicePort} with ${NODE_ENV} mode`,
    'Bootstrap',
  );
}
bootstrap();

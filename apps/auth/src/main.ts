import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger'
import { CrudConfigService } from '@nestjsx/crud';
import * as helmet from 'helmet'
import * as cookie from 'cookie-parser'
import { createDocument } from './swagger/swagger';

CrudConfigService.load({
  query: {
    limit: 10,
    cache: 2000,
    alwaysPaginate: true,
  },
  params: {
    slug: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})

import { AuthModule } from './auth.module';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AuthModule)
  app.disable('x-powered-by')
  app.setGlobalPrefix('api')
  app.disable('x-powered-by')
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.contentSecurityPolicy())
  app.use(cookie())

  app.setGlobalPrefix('api')
  SwaggerModule.setup('api/docs', app, createDocument(app))
  await app.listen(3000);
}
bootstrap();

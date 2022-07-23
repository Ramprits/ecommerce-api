import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger'
import { createDocument } from './swagger/swagger';
import { CrudConfigService } from '@nestjsx/crud';

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

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api')
  SwaggerModule.setup('api/docs', app, createDocument(app))
  await app.listen(3000);
}
bootstrap();

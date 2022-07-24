import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'libs/common/src/database/database.module';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/product/.env' }),
    DatabaseModule,
    TypeOrmModule.forFeature([ProductEntity]
    )
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }

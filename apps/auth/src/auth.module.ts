import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from 'libs/common/src';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/auth/.env' }),
    DatabaseModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule { }

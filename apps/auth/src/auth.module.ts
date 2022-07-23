import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';

console.log(process.env.DATABASE_URL)


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/auth/.env', }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        ssl: {
          rejectUnauthorized: false,
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        autoLoadEntities: true,
        url: config.get<string>("DATABASE_URL")
      }),
      inject: [ConfigService],
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

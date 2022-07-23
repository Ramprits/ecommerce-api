import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './apps/auth/.env', }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        // ssl: {
        //   rejectUnauthorized: false,
        // },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, // This for development
        autoLoadEntities: true,
        url: config.get<string>("DATABASE_URL")
      }),
      inject: [ConfigService],
    }),
    UsersModule],
})
export class AuthModule { }

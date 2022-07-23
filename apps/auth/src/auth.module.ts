import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      password: "plumtree",
      port: 5433,
      database: "authDB",
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

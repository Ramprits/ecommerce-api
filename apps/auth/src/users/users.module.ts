import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtRefreshStrategy } from '../strategy/jwt-refresh.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      secret: config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '60m' },
    }),
  }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy]
})
export class UsersModule { }

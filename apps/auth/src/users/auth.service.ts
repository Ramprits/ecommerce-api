import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponse } from './user.response';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private userService: UsersService,
  ) {}

  generateAccessToken(user: UserResponse) {
    return this.jwt.sign({ id: user.id });
  }

  generateRefreshToken(user: UserResponse) {
    return this.jwt.sign({ id: user.id }, { expiresIn: '7d' });
  }

  async register(user: CreateUserDto): Promise<UserResponse> {
    const create_user = new UserEntity();
    Object.assign(create_user, user);
    return this.buildRegisterResponse(await this.userService.save(create_user));
  }

  buildRegisterResponse(
    arg0: CreateUserDto & UserEntity,
  ): UserResponse | PromiseLike<UserResponse> {
    delete arg0.password;
    return arg0;
  }
}

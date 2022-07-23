import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { UserEntity } from './entities/user.entity';
import { UserResponse } from './user.response';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo);
  }

  async findById(userId: string): Promise<UserResponse> {
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`user not fount with id: ${userId}.`);
    }
    return user;
  }

  async save(user: CreateUserDto) {
    return await this.repo.save(user);
  }

  async findByEmail(
    email: string,
  ): Promise<UserResponse & { password: string }> {
    const user = await this.repo.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException(`user not fount with email: ${email}.`);
    }
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException(this.message(email));
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException(this.message(email));
    }
    return this.buildUserResponse(user);
  }
  message(email: string): string {
    return `User ${email} or password incorrect`;
  }
  buildUserResponse(user: UserResponse) {
    return user;
  }
}

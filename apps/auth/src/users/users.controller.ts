import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto
  },
})
@ApiTags("Users")
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {
  }
}

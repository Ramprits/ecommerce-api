import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { UserResponse } from '../users/user.response'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string): Promise<UserResponse> {
    const user = await this.userService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

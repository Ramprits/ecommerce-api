import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from './auth.service';
import { UserRequest } from '../helpers/expres-request';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    public service: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = this.authService.generateAccessToken(req.user);
    const refresh_token = this.authService.generateRefreshToken(req.user);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);

    // await this.tokenService.createToken({
    //   user_id: req.user?.id,
    //   token: refresh_token,
    //   expired_at: expireDate,
    // })

    return {
      access_token,
    };
  }
}

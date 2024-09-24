import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SigInDto, SignUpDto } from './user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.userService.register(body);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Post('sign-in')
  async signIn(@Body() body: SigInDto) {
    const user = await this.userService.login(body);
    return user;
  }
}

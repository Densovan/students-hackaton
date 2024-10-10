import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  SigInDto,
  SignUpDto,
  updateAvatarDto,
  UpdateUserDto,
} from './user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('Auth and User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post('sign-up')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: 'Sign up' })
  async signUp(@Body() body: SignUpDto) {
    const user = await this.userService.register(body);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Post('sign-in')
  @ApiOperation({ summary: 'Sign In' })
  async signIn(@Body() body: SigInDto) {
    const user = await this.userService.login(body);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get own profile after login' })
  async getProfile(@Req() req: any) {
    const user = await this.userService.findById(req.user.id);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Post('update')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update own profile data' })
  async updateProfile(@Req() req: any, @Body() body: UpdateUserDto) {
    const user = await this.userService.updateById(req.user.id, body);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Put('change-profile')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update own profile picture data' })
  async changeProfile(@Req() req: any, @Body() body: updateAvatarDto) {
    const user = await this.userService.changeProfile(req.user.id, body);
    return user;
  }
}

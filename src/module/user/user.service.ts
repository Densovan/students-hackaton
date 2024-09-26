import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import {
  SigInDto,
  SignUpDto,
  updateAvatarDto,
  UpdateUserDto,
} from './user.dto';
import { Bcrypt } from 'src/utils';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createDTO: SignUpDto) {
    const avatarSvg = createAvatar(style, {
      seed: createDTO.email, // Use email or another unique value as the seed
      base64: true, // Option to return as base64
      width: 64,
      height: 64,
    });
    const existUser = await this.userModel.findOne({
      email: createDTO.email,
    });
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    const hashPass = await Bcrypt.CreatePassword(createDTO.password);

    const user = await this.userModel.create({
      ...createDTO,
      password: hashPass,
      avatar: avatarSvg,
    });

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '30d',
      },
    );

    return { user, token };
  }

  async login(create: SigInDto) {
    const { email, password } = create;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const match = await Bcrypt.verifyPassword(password, user.password);
    if (!match) {
      throw new BadRequestException('Wrong password');
    }
    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '30d',
      },
    );
    return { user, token };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateById(id: string, updateDTO: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const update = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...updateDTO,
      },
      { new: true },
    );
    return update;
  }

  async changeProfile(id: string, updateAvatar: updateAvatarDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const update = await this.userModel.findByIdAndUpdate(
      id,
      {
        updateAvatar,
      },
      { new: true },
    );
    return update;
  }
}

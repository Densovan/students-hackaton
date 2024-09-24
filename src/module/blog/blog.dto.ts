import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;
}

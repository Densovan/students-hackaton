// // import { Controller } from '@nestjs/common';

// // @Controller('cloudinary')
// // export class CloudinaryController {}

// import {
//   Injectable,
//   BadRequestException,
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import { CloudinaryService } from './cloudinary.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth } from '@nestjs/swagger';

// @Controller('upload')
// export class UploadController {
//   constructor(private readonly cloudinaryService: CloudinaryService) {}

//   @HttpCode(HttpStatus.CREATED)
//   @ApiBearerAuth()
//   @Post('upload-image')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadImage(@UploadedFile() file: Express.Multer.File) {
//     return this.cloudinaryService.uploadImage(file);
//   }
// }
// // @Controller('cloudinary')
// // export class AppService {
// //   constructor(private cloudinary: CloudinaryService) {}
// //   async uploadImageToCloudinary(file: Express.Multer.File) {
// //     return await this.cloudinary.uploadImage(file).catch(() => {
// //       throw new BadRequestException('Invalid file type.');
// //     });
// //   }
// // }

import {
  Injectable,
  BadRequestException,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') // Tell Swagger to expect form-data (file upload)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.cloudinaryService.uploadImage(file);
      return result;
    } catch (error) {
      throw new BadRequestException(
        'Failed to upload image. Invalid file type or Cloudinary error.',
      );
    }
  }
}

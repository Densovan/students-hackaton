import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { Mongoose } from 'mongoose';

@Controller('blog')
@ApiTags('Blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post('create-blog')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create blog' })
  async createBlog(@Req() req: any, @Body() body: CreateBlogDto) {
    return await this.blogService.createBlog(req.user.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update blog' })
  @Put('update-blog/:id')
  async updateBlog(
    @Param('id') id: string,
    @Req() req,
    @Body() body: CreateBlogDto,
  ) {
    return await this.blogService.updateBlog(id, req.user.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get an own blog' })
  @Get('get-blog/:id')
  async getBlog(@Param('id') id: string) {
    return await this.blogService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete blog' })
  @Delete('delete-blog/:id')
  async deleteBlog(@Param('id') id: string, @Req() req) {
    return await this.blogService.deleteBlog(id, req.user.id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all own blog' })
  @Get('get-all-blog')
  async getAllBlog(@Req() req) {
    return await this.blogService.getAllBlog(req.user.id);
  }
}

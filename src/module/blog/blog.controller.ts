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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiQuery,
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

  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // @ApiOperation({ summary: 'Get all own blog' })
  // @Get('get-all-blog')
  // async getAllBlog(@Req() req) {
  //   return await this.blogService.getAllBlog(req.user.id);
  // }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all blogs by owner with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
    example: 10,
  })
  @Get('get-all-blogs')
  async getAllBlogs(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.blogService.getAllBlog(req.user.id, page, limit);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all blogs (public)' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (default: 10)',
  })
  @Get('get-all-blog-public')
  async getAllBlogPublic(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.blogService.getPublicBlogs(page, limit);
  }
}

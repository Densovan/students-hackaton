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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './blog.dto';
import { AuthGuard } from '@nestjs/passport';

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
    console.log(req.user);
    // return await this.blogService.createBlog(req.user.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update blog' })
  @Put('update-blog')
  async updateBlog(
    @Param() id: string,
    @Req() req,
    @Body() body: CreateBlogDto,
  ) {
    return await this.blogService.updateBlog(id, req.user.id, body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get a blog' })
  @Get('get-blog')
  async getBlog(@Param() id: string) {
    return await this.blogService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Delete blog' })
  @Delete('delete-blog')
  async deleteBlog(@Param() id: string) {
    return await this.blogService.deleteBlog(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get all blog' })
  @Get('get-all-blog')
  async getAllBlog() {
    return await this.blogService.getAllBlog();
  }
}

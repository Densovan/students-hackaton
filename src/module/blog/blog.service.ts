import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from 'src/schemas/blog.schema';
import { CreateBlogDto } from './blog.dto';

@Injectable()
export class BlogService {
  private logger = new Logger();

  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(userId: string, createDTO: CreateBlogDto) {
    const blog = await this.blogModel.create({
      ...createDTO,
      createdBy: userId,
    });
    return blog;
  }

  async updateBlog(id: string, userId: string, updateDTO: CreateBlogDto) {
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      { ...updateDTO, updatedBy: userId },
      {
        new: true,
      },
    );
    return blog;
  }

  async deleteBlog(id: string, userId: string) {
    const creator = await this.blogModel.findById(id);
    const objectId = new mongoose.Types.ObjectId(id);
    if (creator.createdBy !== objectId) {
      throw new BadRequestException('You are not allowed to delete this blog');
    }
    const blog = await this.blogModel.findByIdAndDelete(id);
    return blog;
  }

  async findById(id: string) {
    const objectId = new Types.ObjectId(id);
    const blog = await this.blogModel.findById(id);
    console.log(id, blog);
    if (!blog) {
      throw new BadRequestException('Blog not found');
    }
    return blog;
  }

  async getAllBlog(ownerId: string) {
    return await this.blogModel.find({ createdBy: ownerId });
  }
}

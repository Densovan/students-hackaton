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
    const existBlog = await this.blogModel.findOne({
      _id: id,
      createdBy: userId,
    });
    if (!existBlog) {
      throw new BadRequestException('Blog not found');
    }
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      { ...updateDTO, updatedBy: userId },
      { new: true, runValidators: true },
    );
    return blog;
  }

  async deleteBlog(id: string, userId: string) {
    const existBlog = await this.blogModel.findOne({
      _id: id,
      createdBy: userId,
    });
    if (!existBlog) {
      throw new BadRequestException('Blog not found');
    }
    const blog = await this.blogModel.findByIdAndDelete(id);
    return blog;
  }

  async findById(id: string) {
    const blog = await this.blogModel.findById(id);

    if (!blog) {
      throw new BadRequestException('Blog not found');
    }
    return blog;
  }

  // async getAllBlog(ownerId: string,page: number = 1, limit: number = 10) {
  //   return await this.blogModel
  //     .find({ createdBy: ownerId })
  //     .populate('createdBy');
  // }
  async getAllBlog(ownerId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const blogs = await this.blogModel
      .find({ createdBy: ownerId })
      .skip(skip)
      .limit(limit)
      .populate('createdBy');

    const totalBlogs = await this.blogModel.countDocuments({
      createdBy: ownerId,
    }); // Get total number of blogs

    return {
      totalBlogs, // Total number of blogs
      currentPage: page, // Current page number
      totalPages: Math.ceil(totalBlogs / limit), // Total number of pages
      blogs, // Paginated blogs
    };
  }

  async getPublicBlogs(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const blogs = await this.blogModel
      .find({})
      .populate('createdBy')
      .skip(skip) // Skip the previous pages
      .limit(limit)
      .sort({ createdAt: -1 }); // Limit the results per page

    const totalBlogs = await this.blogModel.countDocuments({}); // Total number of blogs

    return {
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    };
  }
}

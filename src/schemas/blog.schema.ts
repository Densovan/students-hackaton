import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseCreation } from './base.schema';

@Schema({ collection: 'blogs', timestamps: true })
export class Blog extends BaseCreation {
  @Prop()
  title?: string;

  @Prop()
  desc?: string;

  @Prop()
  thumbnail?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

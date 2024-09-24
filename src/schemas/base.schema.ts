import { Prop } from '@nestjs/mongoose';
import { Types, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
export class BaseCreation {
  @Prop({ type: mSchema.Types.ObjectId, ref: User.name })
  createdBy?: Types.ObjectId;

  @Prop({ type: mSchema.Types.ObjectId, ref: User.name })
  updatedBy?: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}

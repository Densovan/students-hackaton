import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  email!: string;

  @Prop()
  password!: string;

  @Prop({ default: '' })
  phoneNumber?: string;

  @Prop({ default: '' })
  bio?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;

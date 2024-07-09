import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User {
  _id: any = null;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }])
  idFriend: string[];

  @Prop({ required: false })
  OTP?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

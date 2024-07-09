import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';

@Schema({ collection: 'comments', timestamps: true })
export class Comment {
  _id: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

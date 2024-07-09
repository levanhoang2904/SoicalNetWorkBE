import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '../comment/comment.schema';
import mongoose from 'mongoose';

@Schema({ collection: 'notification', timestamps: true })
export class Notification {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: string[];

  @Prop([{ type: mongoose.Schema.ObjectId, ref: 'User' }])
  idAction: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  idPost: string;

  @Prop({ required: true })
  categoryNotifi: string;

  @Prop({ required: false })
  isRead: false;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

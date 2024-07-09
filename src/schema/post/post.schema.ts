import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '../comment/comment.schema';
import mongoose from 'mongoose';

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  _id: string;

  @Prop({ required: true })
  idUser: string;

  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  images: [];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: Comment[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  likes: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  hearts: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  smiles: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  sads: string[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  angrys: string[];

  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

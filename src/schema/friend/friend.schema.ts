import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '../comment/comment.schema';
import mongoose from 'mongoose';

@Schema({ collection: 'friends', timestamps: true })
export class Friend {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  idUser: string;

  @Prop([
    {
      idFriend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      status: { type: Number, default: 0 },
    },
  ])
  friends: { idFriend: mongoose.Schema.Types.ObjectId; status: number }[];
}

export const FriendSchema = SchemaFactory.createForClass(Friend);

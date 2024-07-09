import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendDto } from 'src/dto/friendDto';
import { Friend } from 'src/schema/friend/friend.schema';

@Injectable()
export class FriendService {
  constructor(@InjectModel(Friend.name) private friendModel: Model<Friend>) {}

  async addFriend(friend: FriendDto) {
    try {
      const data = await this.friendModel.findOne({
        idUser: friend.idUser,
        'friends.idFriend': friend.idFriend,
      });

      console.log(data);

      if (data) return this.updateStatusFriend(friend);
      const result = await this.friendModel.findOneAndUpdate(
        { idUser: friend.idUser },
        { $push: { friends: { idFriend: friend.idFriend, status: 0 } } },
        { new: true, upsert: true },
      );
      if (result)
        return {
          result,
          statusCode: 200,
        };

      return {
        data: null,
        statusCode: 400,
      };
    } catch (error) {
      console.log(error);

      return {
        error,
        statusCode: 500,
      };
    }
  }

  async updateStatusFriend(friend: FriendDto) {
    const result = await this.friendModel.findOneAndUpdate(
      { idUser: friend.idUser },
      { $pull: { friends: { idFriend: friend.idFriend } } },
      { new: true },
    );
    return {
      result,
      statusCode: 200,
    };
  }

  async getFriend(idUser: string) {
    return await this.friendModel
      .find({ idUser })
      .populate([{ path: 'idUser' }, { path: 'friends.idFriend' }]);
  }

  async inviteFriend(idUser: string) {
    return {
      data: await this.friendModel
        .find({ 'friends.idFriend': idUser, 'friends.status': 0 })
        .populate([{ path: 'idUser' }, { path: 'friends.idFriend' }]),
      statusCode: 200,
    };
  }

  async confirmFriend(idUser: string, idFriend: string, confirm: boolean) {
    const data = await this.friendModel.findOneAndUpdate(
      { idUser: idUser, 'friends.idFriend': idFriend },
      confirm
        ? { $set: { 'friends.$.status': 1 } }
        : { $pull: { friends: { idFriend: idFriend } } },
      { new: true },
    );
    return {
      data,
      statusCode: 200,
    };
  }
}

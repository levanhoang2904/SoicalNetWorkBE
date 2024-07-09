import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUser(idUser: string) {
    return await this.userModel.find({
      _id: { $ne: idUser },
    });
  }

  async getUserById(id: string) {
    try {
      const data = await this.userModel.findById(id);
      if (data) {
        return {
          data,
          statusCode: 200,
        };
      }
      return {
        data: 'Không tìm thấy',
        statusCode: 404,
      };
    } catch (error) {
      return {
        Error: error,
        statusCode: 401,
      };
    }
  }
}

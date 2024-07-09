import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'src/schema/notification/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notifiModel: Model<Notification>,
  ) {}

  async getNotifi(idUser: string) {
    return {
      data: await this.notifiModel
        .find({ idUser: idUser })
        .populate([{ path: 'idAction' }])
        .sort({ updatedAt: -1 }),
    };
  }

  async createNotifi(
    idUser: string,
    idAction: string,
    categoryNotifi: string,
    idPost: string,
  ) {
    const data = await this.notifiModel.findOneAndUpdate(
      { idUser, categoryNotifi, idPost },
      {
        $addToSet: { idAction: idAction },
        idPost,
        updatedAt: new Date(),
        isRead: false,
      },
      { new: true, upsert: true },
    );
    return data;
  }

  async updateNotification(idNotifi: string) {
    const data = await this.notifiModel.findByIdAndUpdate(idNotifi, {
      isRead: true,
    });
    return {
      data,
      stautsCode: 200,
    };
  }
}

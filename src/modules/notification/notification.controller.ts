import { Controller, Body, Post, Query, Get, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notifiService: NotificationService) {}

  @Get()
  getNotifiByIdUser(@Query('id') idUser: string) {
    console.log(idUser);
    return this.notifiService.getNotifi(idUser);
  }
  @Post()
  createNotifi(@Body() body) {
    console.log(body.data);
    if (body.data.idUser !== body.data.idAction)
      return this.notifiService.createNotifi(
        body.data.idUser,
        body.data.idAction,
        body.data.categoryNotifi,
        body.data.idPost,
      );
    return;
  }

  @Patch()
  updateNotifi(@Query('id') id: string) {
    return this.notifiService.updateNotification(id);
  }
}

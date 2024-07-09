import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { FriendService } from './friend.service';

@Controller('friend')
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Post()
  addFriend(@Body() body) {
    return this.friendService.addFriend(body.data);
  }

  @Get()
  getFriend(@Query('id') idUser: string) {
    return this.friendService.getFriend(idUser);
  }

  @Get('/invite')
  inviteFriend(@Query('id') idUser: string) {
    return this.friendService.inviteFriend(idUser);
  }

  @Patch('/confirm')
  confirmFriend(@Query() query) {
    console.log(query);
    return this.friendService.confirmFriend(
      query.idUser,
      query.idFriend,
      query.confirm,
    );
  }

  @Patch()
  updateStausFriend(@Body() body) {
    return this.friendService.updateStatusFriend(body);
  }
}

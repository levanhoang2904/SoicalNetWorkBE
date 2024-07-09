import { Controller, UseGuards, Get, Req, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getDetailUser(@Req() request: Request) {
    try {
      if ('user' in request) {
        return {
          data: request.user,
          message: 'Thành công',
          status: 200,
        };
      } else
        return {
          message: 'Vui lòng đăng nhập lại',
          status: 401,
        };
    } catch (error) {
      return {
        message: 'Vui lòng đăng nhập lại',
        status: 401,
      };
    }
  }

  @Get('/all')
  getAllUserFriend(@Query('id') idUser: string) {
    return this.userService.getAllUser(idUser);
  }

  @Get(':id')
  getUserByd(@Param('id') id: string) {
    console.log('params');

    return this.userService.getUserById(id);
  }
}

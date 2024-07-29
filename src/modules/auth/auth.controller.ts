import { Controller, Get, Body, Param, Query, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/userDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  login(@Query() user) {
    return this.authService.login(user);
  }

  @Post('/create')
  async createUser(@Body() userDto: UserDto) {
    try {
      return await this.authService.createUser(userDto);
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

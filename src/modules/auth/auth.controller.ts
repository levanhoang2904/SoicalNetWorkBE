import { Controller, Get, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  login(@Query() user) {
    return this.authService.login(user);
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/userDto';
import { User } from 'src/schema/user/user.schema';
import { configDotenv } from 'dotenv';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const data: any = await this.authModel.findOne({
      email: userDto.email,
      password: userDto.password,
    });

    if (data) {
      const payload = { email: userDto.email };

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SCERET,
          expiresIn: '3600s',
        }),
      };
    }
  }
}

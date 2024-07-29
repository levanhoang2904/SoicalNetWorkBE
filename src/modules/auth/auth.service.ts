import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/userDto';
import { User } from 'src/schema/user/user.schema';
import { configDotenv } from 'dotenv';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async comparePassword(rawPass: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(rawPass, hash);
  }

  async login(userDto: UserDto) {
    const data: any = await this.authModel.findOne({
      email: userDto.email,
    });

    if (data) {
      const matched: boolean = await this.comparePassword(
        userDto.password,
        data.password,
      );
      if (matched) {
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

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hashSync(password, salt);
  }

  async createUser(userDto: UserDto) {
    try {
      const isEmailExists = await this.authModel.findOne({
        email: userDto.email,
      });
      if (isEmailExists) {
        return {
          statusCode: 401,
          message: 'Email đã tồn tại',
        };
      } else {
        const salt = await bcrypt.genSalt();
        userDto.password = await this.hashPassword(userDto.password, salt);
        await this.authModel.create(userDto);
        return {
          statusCode: 201,
          message: 'Thêm người dùng thành công',
        };
      }
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error);
      return false;
    }
  }
}

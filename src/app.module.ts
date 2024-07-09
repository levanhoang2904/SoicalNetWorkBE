import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './modules/message/message.module';
import { ChatGateway } from './chat/chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { FriendModule } from './modules/friend/friend.module';
import { NotificationModule } from './modules/notification/notification.module';
@Module({
  imports: [
    MessageModule,
    MongooseModule.forRoot(
      'mongodb+srv://levanhoang29042002:0987654321Hoang@socailnetwork.wtt2rij.mongodb.net/SoicalNetwork',
    ),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    FriendModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}

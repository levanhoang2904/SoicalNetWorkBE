import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { Friend, FriendSchema } from 'src/schema/friend/friend.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Friend.name,
        schema: FriendSchema,
      },
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}

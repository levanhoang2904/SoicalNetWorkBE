import {
  Controller,
  Post,
  Query,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(@Body() body, @Query('idPost') idPost: string) {
    return this.commentService.createComment(body.data, idPost);
  }

  @Delete()
  deleteComment(
    @Query('idComment') idComment: string,
    @Query('idPost') idPost: string,
  ) {
    console.log(idComment, idPost);

    return this.commentService.removeComment(idComment, idPost);
  }
}

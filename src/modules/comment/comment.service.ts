import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from 'src/dto/commentDto';
import { Comment } from 'src/schema/comment/comment.schema';
import { Post } from 'src/schema/post/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async createComment(commentDto: CommentDto, idPost: string) {
    try {
      const data = await this.commentModel.create(commentDto);

      if (data) {
        const post = await this.postModel.findByIdAndUpdate(
          idPost,
          { $push: { comments: data._id } },
          { new: true },
        );
        return {
          data,
          statusCode: 200,
        };
      }

      return {
        data: null,
        statusCode: 401,
      };
    } catch (error) {
      return {
        error,
        statusCode: 400,
      };
    }
  }

  async removeComment(idComment: string, idPost: string) {
    try {
      const data = await this.commentModel.findByIdAndDelete(idComment);
      if (data) {
        await this.postModel.findByIdAndUpdate(idPost, {
          $pull: { comments: data._id },
        });
        return {
          message: 'Xóa bình luận thành công',
          statusCode: 200,
        };
      }
      return {
        message: 'Không tìm thấy bình luận',
        statusCode: 404,
      };
    } catch (error) {
      return {
        error,
        statusCode: 400,
      };
    }
  }
}

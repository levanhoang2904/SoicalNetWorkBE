import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from 'src/dto/postDto';
import { Post } from 'src/schema/post/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getPosts() {
    const data: any = await this.postModel
      .find()
      .sort({ createdAt: -1 })
      .populate([
        { path: 'comments', populate: { path: 'idUser', select: 'name' } },
        { path: 'likes' },
        { path: 'hearts' },
        { path: 'smiles' },
        { path: 'sads' },
        { path: 'angrys' },
      ]);

    return {
      data,
      statusCode: 200,
    };
  }

  async createPost(post: PostDto) {
    try {
      const data = await this.postModel.create(post);
      return {
        data,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        error: Error,
        statusCode: 400,
      };
    }
  }

  async likePost(idUser, idPost, categoryLike) {
    try {
      const reactionTypes = {
        like: 'likes',
        heart: 'hearts',
        smile: 'smiles',
        sad: 'sads',
        angry: 'angrys',
      };

      const reactionField = reactionTypes[categoryLike];
      if (!reactionField) {
        throw new Error('Invalid reaction type');
      }

      const post = await this.postModel.findOne({
        _id: idPost,
        $or: [
          { likes: idUser },
          { hearts: idUser },
          { smiles: idUser },
          { sads: idUser },
          { angrys: idUser },
        ],
      });
      let likeCurrent = '';
      if (post) {
        if (post[reactionField].includes(idUser)) {
          return this.removeLikePost(idUser, idPost, categoryLike + 's');
        }
        (likeCurrent =
          Object.keys(reactionTypes).filter((react) =>
            post[react + 's'].includes(idUser),
          )[0] + 's'),
          this.removeLikePost(idUser, idPost, likeCurrent);
      }
      const data = await this.postModel.findByIdAndUpdate(idPost, {
        $push: { [reactionField]: idUser },
      });

      return {
        data,
        likeCurrent,
        statusCode: 200,
      };
    } catch (error) {
      return {
        error: error.message,
        statusCode: 500,
      };
    }
  }

  async removeLikePost(idUser, idPost, categoryLike) {
    try {
      const data = await this.postModel.findByIdAndUpdate(idPost, {
        $pull: { [categoryLike]: idUser },
      });
      return {
        message: 'delete',
        statusCode: 201,
      };
    } catch (error) {
      return {
        error: error.message,
        statusCode: 500,
      };
    }
  }

  async getPostByIdPost(idPost: string, idUser: string) {
    return {
      data: await this.postModel
        .findOne({ _id: idPost, idUser: idUser })
        .populate([
          { path: 'comments', populate: { path: 'idUser', select: 'name' } },
          { path: 'likes' },
          { path: 'hearts' },
          { path: 'smiles' },
          { path: 'sads' },
          { path: 'angrys' },
        ]),
      statusCode: 200,
    };
  }

  async getPostByIdUser(idUser: string) {
    return {
      data: await this.postModel
        .find({ idUser: idUser })
        .sort({ createdAt: -1 })
        .populate([
          { path: 'comments', populate: { path: 'idUser', select: 'name' } },
          { path: 'likes' },
          { path: 'hearts' },
          { path: 'smiles' },
          { path: 'sads' },
          { path: 'angrys' },
        ]),
      statusCode: 200,
    };
  }
}

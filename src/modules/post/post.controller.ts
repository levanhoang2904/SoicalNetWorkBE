import { Body, Controller, Get, Post, Patch, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Post()
  createPost(@Body() body) {
    return this.postService.createPost(body);
  }

  @Patch()
  likePost(@Query() query) {
    return this.postService.likePost(
      query.idUser,
      query.idPost,
      query.categoryLike,
    );
  }

  @Get('/detail')
  getPostByIdPost(
    @Query('id') idPost: string,
    @Query('idUser') idUser: string,
  ) {
    return this.postService.getPostByIdPost(idPost, idUser);
  }

  @Get('/detailByIdUser')
  getPostByIdUser(@Query('id') idUser: string) {
    return this.postService.getPostByIdUser(idUser);
  }
}

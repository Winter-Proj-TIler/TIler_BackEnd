import { Body, Controller, Get, Headers, Param, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  async createPost(@Headers('Authorization') token: string, @Body() createPostDto: CreatePostDto) {
    await this.postService.createPost(token, createPostDto);

    return Object.assign({
      statusCode: 201,
      message: '글 게시 성공',
    });
  }

  @Get('/:postId')
  async getPost(@Param('postId') postId: number) {
    const post = await this.postService.getPost(Number(postId));

    return Object.assign({
      statusCode: 200,
      message: '조회 성공',
      post,
    });
  }

  @Patch('/:postId')
  async updatePost(@Param('postId') postId: number, @Headers('Authorization') token: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postService.updatePost(postId, token, updatePostDto);

    return Object.assign({
      statusCode: 200,
      message: '수정에 성공했습니다',
    });
  }
}

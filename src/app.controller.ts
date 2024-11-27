import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';
import { CreatePostDto } from './posts/dto/create-post.dto';
import { UpdatePostDto } from './posts/dto/update-post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly postsService: PostsService
  ) {}

  @Get('posts')
  getPosts(): Promise<any> {
    return this.postsService.getPosts();
  }

  @Post('posts')
  createPost(@Body() createPostDto: CreatePostDto, @Res() res): Promise<any> {
    return this.postsService.createPost(createPostDto, res);
  }

  @Delete('post/:id')
  deletePost(@Param("id") id): Promise<any> {
    return this.postsService.deletePostById(id);
  }
  @Patch('post/:id')
  updatePost(@Param("id") id, @Body() updatePostDto: UpdatePostDto, @Res() res): Promise<any> {
    return this.postsService.updatePostById(id, updatePostDto, res);
  }

  @Get('posts/page')
  getPostsPaginate(@Query("page") page, @Query("limit") limit): Promise<any> {
    return this.postsService.getPostsPaginate(page, limit);
  }
  @Get('posts/search')
  searchPosts(@Query("search") search): Promise<any> {
    return this.postsService.searchByAnyField(search);
  }
}

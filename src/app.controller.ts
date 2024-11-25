import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly postsService: PostsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('posts')
  getPosts(): Promise<any> {
    return this.postsService.getPosts();
  }

  @Post('posts')
  createPost(): Promise<any> {
    return this.postsService.createPost({
      user: 'John Doe',
      title: 'Hello World',
      content: 'This is a post',
      created_at: new Date(),
      updated_at: new Date(),
      isActive: true,
      image: 'image.jpg',
    });
  }
}

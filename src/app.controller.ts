import { Controller, Get } from '@nestjs/common';
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
}

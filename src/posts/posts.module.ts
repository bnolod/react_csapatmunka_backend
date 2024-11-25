import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostsService],

  exports: [PostsService, PostsModule],
})
export class PostsModule {}

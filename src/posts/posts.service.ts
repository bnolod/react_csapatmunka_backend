import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post } from './interface/post.interface';

@Injectable()
export class PostsService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    

    async getPosts(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    async createPost(post: Post): Promise<Post> {
        const newPost = new this.postModel(post);
        return newPost.save();
    }

    
}

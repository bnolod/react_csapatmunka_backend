import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post } from './interface/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

    

    async getPosts(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    //paginate

    async getPostsPaginate(page: number, limit: number): Promise<Post[]> {
        return this.postModel.find().skip((page - 1) * limit).limit(limit).exec();
    }

    async createPost(createPostDto: CreatePostDto): Promise<Post> {
        const newPost = new this.postModel(createPostDto);
        return newPost.save();
    }

    async getPostById(postId: string): Promise<Post> {
        return this.postModel.findById(postId).exec();
    }

    async updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<Post> {
        return this.postModel.findByIdAndUpdate(postId, updatePostDto, { new: true });

    }

    async deletePost(postId: string): Promise<Post> {
        return this.postModel.findByIdAndDelete(postId).exec();
    }
}

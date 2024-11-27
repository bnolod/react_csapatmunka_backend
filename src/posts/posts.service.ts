import { BadRequestException, HttpStatus, Injectable, Res } from '@nestjs/common';
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

    async createPost(createPostDto: CreatePostDto, @Res() res): Promise<Post> {

        if (!createPostDto) {
            throw new BadRequestException('Töltsd ki az összes mezőt!');
        }
        if (!createPostDto.phone.match(/^[0-9]{11}$/)) {
            throw new BadRequestException('Helytelen telefonszám formátum');
        }
        
        if (createPostDto.title.length < 3 || createPostDto.title.length > 20) {
            throw new BadRequestException('A címnek 3 és 20 karakter között kell lennie');
        }
        if (createPostDto.content.length < 0 || createPostDto.content.length > 200) {
            throw new BadRequestException('A tartalomnak 0 és 200 karakter között kell lennie');
        }
       
        if (!createPostDto.image.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)) {
            throw new BadRequestException('Helytelen kép URL');
        }

        const newPost = new this.postModel(
            {
                phone: createPostDto.phone,
                title: createPostDto.title,
                content: createPostDto.content,
                created_at: new Date(),
                updated_at: new Date(),
                isActive: true,
                image: createPostDto.image
            }
        );
        newPost.save();
        return res.status(HttpStatus.OK).json({message : "Sikeresen hozzáadva!", data: newPost});
    }

    async getPostById(postId: string): Promise<Post> {
        return this.postModel.findById(postId).exec();
    }

    async updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<Post> {

        if (!updatePostDto) {
            throw new BadRequestException('Töltsd ki az összes mezőt!');
        }
        if (!updatePostDto.phone.match(/^[0-9]{11}$/)) {
            throw new BadRequestException('Helytelen telefonszám formátum');
        }
        if (updatePostDto.title.length < 3 || updatePostDto.title.length > 20) {
            throw new BadRequestException('A címnek 3 és 20 karakter között kell lennie');
        }
        if (updatePostDto.content.length < 0 || updatePostDto.content.length > 200) {
            throw new BadRequestException('A tartalomnak 0 és 200 karakter között kell lennie');
        }
       

        return this.postModel.findByIdAndUpdate(postId, updatePostDto, { new: true });

    }

    async deletePostById(postId: string): Promise<Post> {
        const deleted = await this.postModel.findByIdAndDelete(postId).exec();

        if (!deleted) {
            throw new BadRequestException('Nem található a megadott ID!');
        }
        return deleted;
    }

    async updatePostById(id: string, updatePostDto: UpdatePostDto, @Res() res): Promise<Post> {
        try {
            const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
            return res.status(HttpStatus.OK).json({message : "Sikeresen frissítve!", data: updatedPost});
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message : "Nem található a megadott ID!"});
        }
    }

    async searchByAnyField(search: string): Promise<Post[]> {
        return this.postModel.find({
            $or: [
                { phone: { $regex: search, $options: 'i' } },
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { image: { $regex: search, $options: 'i' } },
                { created_at: { $regex: search, $options: 'i' } },
            ]
        }).exec();
    }

    async paginate(page: number, limit: number): Promise<Post[]> {
        return this.postModel.find().skip((page - 1) * limit).limit(limit).exec();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class PostsService {

    constructor(@InjectConnection() private connection : Connection) {}

    getPosts(): string {
        return 'This will return all posts';
    }
}

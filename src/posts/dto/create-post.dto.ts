
export class CreatePostDto {
    user: string;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    isActive: boolean;
    image: string;
}
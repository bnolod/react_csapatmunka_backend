import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    user: String,
    title: String,
    content: String,
    created_at: Date,
    updated_at: Date,
    isActive: Boolean,
    image: String
  });
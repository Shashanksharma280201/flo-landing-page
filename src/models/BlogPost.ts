import mongoose, { Schema, Model } from 'mongoose';
import { BlogPost } from '@/types';

// Define the schema corresponding to the document interface.
const BlogPostSchema = new Schema<BlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String }, // Optional in list view, required for single post
    coverImage: { type: String, required: true },
    
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      required: true,
    },
    tags: { type: [String], default: [] },
    readTimeMinutes: { type: Number, default: 0 },
    publishedAt: { type: String }, // Storing dates as ISO strings per interface
    
    author: {
      name: { type: String, required: true },
      role: { type: String },
      avatar: { type: String },
    },

    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    collection: 'blogposts', // Explicitly set collection name
  }
);

// Check if model already exists to prevent overwrite error in dev
const BlogPostModel: Model<BlogPost> =
  mongoose.models.BlogPost || mongoose.model<BlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;

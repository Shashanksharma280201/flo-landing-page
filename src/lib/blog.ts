import dbConnect from '@/lib/db';
import BlogPostModel from '@/models/BlogPost';
import { BlogPost } from '@/types';

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect();
    const post = await BlogPostModel.findOne({ 
      slug, 
      status: 'published' 
    }).lean<BlogPost>();
    
    if (!post) return null;
    
    // Convert _id and dates to strings to match the interface and ensure serialization
    return {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    await dbConnect();
    const posts = await BlogPostModel.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-content') // Exclude heavy content for list view
      .lean<BlogPost[]>();

    return posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    }));
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

export interface BlogPost {
  _id: string; // MongoDB ObjectId
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage: string;
  
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  readTimeMinutes: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;

  author: {
    name: string;
    role?: string;
    avatar?: string;
  };

  seo?: {
    title?: string;
    description?: string;
  };
}

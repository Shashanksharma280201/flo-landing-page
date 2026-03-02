'use client';

import { motion } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types';

interface BlogGridProps {
  posts: Partial<BlogPost>[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post as BlogPost} />
      ))}
    </motion.div>
  );
}

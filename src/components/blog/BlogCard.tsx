'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BlogPost } from '@/types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <Card className="flex h-full flex-col gap-0 overflow-hidden rounded-3xl border border-gray-100 bg-white py-0 shadow-md transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
          <CardHeader className="gap-0 overflow-hidden p-0 px-0">
            <div className="relative aspect-16/10 w-full">
              <Image
                src={post.coverImage || '/placeholder-blog.jpg'}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="grow space-y-2 p-6 px-6">
            <h3 className="group-hover:text-primary text-xl leading-tight font-bold text-gray-900 transition-colors duration-300">
              {post.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-800">{post.author.name}</span>
              <span className="text-gray-300">·</span>
              <time dateTime={post.publishedAt || post.createdAt}>
                {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
              </time>
            </div>
          </CardContent>
          <CardFooter className="mt-auto p-6 px-6 pt-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 transition-all duration-300 group-hover:gap-3">
              Read Article
              <span className="group-hover:bg-primary h-[2px] w-6 bg-gray-100 transition-all duration-300 group-hover:w-10" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

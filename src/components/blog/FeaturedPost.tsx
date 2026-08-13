'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon, UserIcon } from 'lucide-react';
import { SharedTitle } from './SharedTitle';
import { motion } from 'framer-motion';

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative mx-auto max-w-6xl"
    >
      <div className="from-primary/20 to-primary/10 absolute -inset-1 rounded-3xl bg-linear-to-r opacity-15 blur-md transition duration-1000 group-hover:opacity-30 group-hover:duration-200"></div>
      <div className="relative grid items-stretch gap-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden md:aspect-auto">
          <Image
            src={post.coverImage || '/placeholder-blog.jpg'}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6 bg-white p-6 md:p-12 lg:p-16">
          <div className="text-primary flex items-center gap-4 text-xs font-semibold tracking-widest uppercase">
            <span className="bg-primary/10 border-primary/20 rounded border px-2 py-1">
              Featured
            </span>
            <div className="text-muted-foreground flex items-center gap-1.5 font-medium tracking-normal normal-case">
              <CalendarIcon className="h-3.5 w-3.5" />
              <time dateTime={post.publishedAt || post.createdAt}>
                {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
              </time>
            </div>
          </div>

          <div className="space-y-4">
            <Link href={`/blogs/${post.slug}`}>
              <SharedTitle
                title={post.title}
                slug={post.slug}
                as="h2"
                className="hover:text-primary text-[clamp(1.75rem,5vw,3rem)] leading-[1.1] font-bold tracking-tight text-gray-900 transition-colors"
              />
            </Link>

            <p className="line-clamp-3 text-lg leading-relaxed text-gray-600">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/80 rounded-full px-8 transition-all duration-300"
            >
              <Link href={`/blogs/${post.slug}`}>Read Article</Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                  />
                ) : (
                  <UserIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="text-sm">
                <p className="leading-none font-bold text-gray-900">{post.author.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {post.author.role || 'Team Flo'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

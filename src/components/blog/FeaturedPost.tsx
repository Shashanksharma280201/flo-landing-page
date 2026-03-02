"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
import { SharedTitle } from "./SharedTitle";
import { motion } from "framer-motion";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group max-w-6xl mx-auto"
    >
      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-3xl blur-md opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative grid md:grid-cols-2 gap-0 overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-xl items-stretch">
        <div className="relative aspect-video md:aspect-auto overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder-blog.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16 space-y-6 bg-white">
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20">
              Featured
            </span>
            <div className="flex items-center gap-1.5 text-muted-foreground normal-case font-medium tracking-normal">
              <CalendarIcon className="w-3.5 h-3.5" />
              <time dateTime={post.publishedAt || post.createdAt}>
                {format(
                  new Date(post.publishedAt || post.createdAt),
                  "MMMM d, yyyy",
                )}
              </time>
            </div>
          </div>

          <div className="space-y-4">
            <Link href={`/blogs/${post.slug}`}>
              <SharedTitle
                title={post.title}
                slug={post.slug}
                as="h2"
                className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-gray-900 hover:text-primary transition-colors leading-[1.1]"
              />
            </Link>

            <p className="text-lg text-gray-600 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-primary hover:bg-primary/80 transition-all duration-300"
            >
              <Link href={`/blogs/${post.slug}`}>Read Article</Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                  />
                ) : (
                  <UserIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="text-sm">
                <p className="font-bold text-gray-900 leading-none">
                  {post.author.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {post.author.role || "Team Flo"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

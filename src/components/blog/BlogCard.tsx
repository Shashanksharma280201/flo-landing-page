"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/blogs/${post.slug}`} className="group block h-full">
        <Card className="flex flex-col h-full overflow-hidden bg-white border border-gray-100 py-0 gap-0 shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 rounded-3xl">
          <CardHeader className="p-0 px-0 gap-0 overflow-hidden">
            <div className="relative w-full aspect-16/10">
              <Image
                src={post.coverImage || "/placeholder-blog.jpg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardHeader>
          <CardContent className="grow p-6 px-6 space-y-2">
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-800">
                {post.author.name}
              </span>
              <span className="text-gray-300">—</span>
              <time dateTime={post.publishedAt || post.createdAt}>
                {format(
                  new Date(post.publishedAt || post.createdAt),
                  "MMMM d, yyyy",
                )}
              </time>
            </div>
          </CardContent>
          <CardFooter className="p-6 px-6 pt-0 mt-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 group-hover:gap-3 transition-all duration-300">
              Read Article
              <span className="w-6 h-[2px] bg-gray-100 group-hover:bg-primary group-hover:w-10 transition-all duration-300" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

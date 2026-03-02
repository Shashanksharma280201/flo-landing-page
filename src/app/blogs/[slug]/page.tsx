import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.seo?.title || `${post.title} | Flo Mobility Blog`,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      images: [post.coverImage || "/og-image.jpg"],
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
    },
  };
}

import { SharedTitle } from "@/components/blog/SharedTitle";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Sanitize content before rendering
  const sanitizedContent = DOMPurify.sanitize(post.content || "", {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "title",
      "loading",
      "class",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel|data):|[^&?#]*(?:[?#]|$)|https:\/\/www\.youtube-nocookie\.com\/)/i,
  });

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/blogs"
          className="group mb-12 inline-flex items-center gap-2 py-2 text-gray-500 transition-all duration-300 no-underline"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:text-primary duration-300 group-hover:-translate-x-1.5" />

          <span className="transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">
            Back to Blog
          </span>
        </Link>
      </div>

      <article className="max-w-5xl mx-auto px-1">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-lg overflow-hidden">
          <div className="px-6 py-12 md:px-16 md:py-20">
            <header className="space-y-6 text-center mb-16">
              <SharedTitle
                title={post.title}
                slug={post.slug}
                as="h1"
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900"
              />

              <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden relative">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <span>{post.author.name}</span>
                </div>
                <span className="text-gray-300">•</span>
                <time dateTime={post.publishedAt || post.createdAt}>
                  {format(
                    new Date(post.publishedAt || post.createdAt),
                    "MMMM d, yyyy",
                  )}
                </time>
              </div>
            </header>

            {post.coverImage && (
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-16 border border-gray-50">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            <div
              className="prose prose-lg md:prose-xl mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-gray-50"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, UserIcon } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { SharedTitle } from '@/components/blog/SharedTitle';
import { JsonLd } from '@/components/shared/json-ld';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';

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
      title: 'Post Not Found',
    };
  }
  return {
    title: post.seo?.title || `${post.title} | Flo Mobility Blog`,
    description: post.seo?.description || post.excerpt || '',
    alternates: {
      canonical: `${SITE_URL}/blogs/${post.slug}`,
    },
    openGraph: {
      images: [post.coverImage || '/og-image.jpg'],
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || '',
      url: `${SITE_URL}/blogs/${post.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt || '',
      images: [post.coverImage || DEFAULT_OG_IMAGE],
    },
  };
}

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
  const sanitizedContent = DOMPurify.sanitize(post.content || '', {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'src',
      'title',
      'loading',
      'class',
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel|data):|[^&?#]*(?:[?#]|$)|https:\/\/www\.youtube-nocookie\.com\/)/i,
  });

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blogs/${post.slug}#article`,
    headline: post.title,
    description: post.seo?.description || post.excerpt || '',
    image: absoluteUrl(post.coverImage || DEFAULT_OG_IMAGE),
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${post.slug}`,
    },
  };

  return (
    <div className="mt-[40px] min-h-screen py-12 md:py-20">
      <JsonLd data={articleJsonLd} />
      <div className="mx-auto max-w-4xl px-4">
        <Link
          href="/blogs"
          className="group mb-12 inline-flex items-center gap-2 py-2 text-gray-500 no-underline transition-all duration-300"
        >
          <ArrowLeftIcon className="group-hover:text-primary h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />

          <span className="group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
            Back to Blog
          </span>
        </Link>
      </div>

      <article className="mx-auto max-w-5xl px-1">
        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-lg">
          <div className="px-6 py-12 md:px-16 md:py-20">
            <header className="mb-16 space-y-6 text-center">
              <SharedTitle
                title={post.title}
                slug={post.slug}
                as="h1"
                className="text-3xl leading-[1.1] font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
              />

              <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-gray-50">
                    {post.author.avatar ? (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <span>{post.author.name}</span>
                </div>
                <span className="text-gray-300">•</span>
                <time dateTime={post.publishedAt || post.createdAt}>
                  {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
                </time>
              </div>
            </header>

            {post.coverImage && (
              <div className="relative mb-16 aspect-video overflow-hidden rounded-3xl border border-gray-50 shadow-xl">
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
              className="prose prose-lg md:prose-xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-strong:text-gray-900 prose-code:text-primary prose-code:bg-gray-50 mx-auto max-w-3xl"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

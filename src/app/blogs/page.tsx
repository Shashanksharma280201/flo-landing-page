import { getAllPosts } from '@/lib/blog';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Insights & Innovation - Flo Mobility Blog',
  description:
    'Exploring the future of autonomous navigation, robotics, and the technology behind Flo Mobility.',
  path: '/blogs',
});

export default async function BlogIndexPage() {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];

  // Prune morePosts for grid cards - they don't need excerpt or other heavy fields
  const morePosts = allPosts.slice(1).map(({ excerpt, ...rest }) => rest);

  return (
    <div className="selection:bg-primary/30 mt-[40px]">
      {/* Hero Section */}
      <div className="relative pt-16 pb-10 md:pt-24 md:pb-16">
        <div className="relative z-10 container mx-auto mb-16 px-4 text-center md:mb-24">
          <h1 className="font-display mb-6 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.15] font-bold tracking-tight break-words text-gray-900">
            Insights &{' '}
            <span className="text-primary inline [box-decoration-break:clone] italic [-webkit-box-decoration-break:clone]">
              Innovation
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Exploring the frontier of autonomous robotics and the stories of the team
            building the future of mobility.
          </p>
        </div>

        <div className="relative z-20 container mx-auto px-4">
          {heroPost ? (
            <FeaturedPost post={heroPost} />
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-xl italic">
                Our story is just beginning. Check back soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-4 pt-4 pb-24">
        <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Recent Updates
            </h2>
            <div className="bg-primary h-1 w-20 rounded-full" />
          </div>
          <p className="text-muted-foreground font-medium">
            Showing {morePosts.length} articles
          </p>
        </div>

        {morePosts.length > 0 ? (
          <BlogGrid posts={morePosts} />
        ) : heroPost ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-500 italic">More articles coming soon...</p>
          </div>
        ) : null}
      </div>

      {/* Newsletter / CTA Section could go here */}
    </div>
  );
}

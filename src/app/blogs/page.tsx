import { getAllPosts } from '@/lib/blog';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { FeaturedPost } from '@/components/blog/FeaturedPost';

export const metadata = {
  title: 'Insights & Innovation - Flo Mobility Blog',
  description: 'Exploring the future of autonomous navigation, robotics, and the technology behind Flo Mobility.',
};

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function BlogIndexPage() {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  
  // Prune morePosts for grid cards - they don't need excerpt or other heavy fields
  const morePosts = allPosts.slice(1).map(({ excerpt, ...rest }) => rest);

  return (
    <div className="selection:bg-primary/30">
      {/* Hero Section */}
      <div className="relative pt-16 pb-10 md:pt-24 md:pb-16">
        <div className="container relative z-10 mx-auto px-4 text-center mb-16 md:mb-24">
          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-bold tracking-tight mb-6 text-gray-900 font-display">
            Insights & <span className="text-primary italic">Innovation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Exploring the frontier of autonomous robotics and the stories of the team building the future of mobility.
          </p>
        </div>

        <div className="container relative z-20 mx-auto px-4">
          {heroPost ? (
            <FeaturedPost post={heroPost} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-xl italic">Our story is just beginning. Check back soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-4 pt-4 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Recent Updates</h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>
          <p className="text-muted-foreground font-medium">Showing {morePosts.length} articles</p>
        </div>

        {morePosts.length > 0 ? (
          <BlogGrid posts={morePosts} />
        ) : heroPost ? (

          <div className="bg-gray-50 rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <p className="text-gray-500 italic">More articles coming soon...</p>
          </div>
        ) : null}
      </div>

      {/* Newsletter / CTA Section could go here */}
    </div>
  );
}

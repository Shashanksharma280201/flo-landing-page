import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-4xl font-bold">404 - Post Not Found</h2>
      <p className="text-muted-foreground mb-8 text-xl">
        Could not find the requested blog post.
      </p>
      <Button asChild>
        <Link href="/blogs">Return to Blog</Link>
      </Button>
    </div>
  );
}

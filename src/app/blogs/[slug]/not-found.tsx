import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Post Not Found</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Could not find the requested blog post.
      </p>
      <Button asChild>
        <Link href="/blogs">Return to Blog</Link>
      </Button>
    </div>
  )
}

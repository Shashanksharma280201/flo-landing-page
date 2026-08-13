import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn about Flo Mobility, the team building autonomous robots for construction and industrial site operations in India.',
  path: '/about',
  image: '/about/showcase.avif',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      {children}
    </>
  );
}

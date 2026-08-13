import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Careers',
  description:
    'Explore careers at Flo Mobility and help build autonomous robots deployed on active construction and industrial sites.',
  path: '/careers',
});

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />
      {children}
    </>
  );
}

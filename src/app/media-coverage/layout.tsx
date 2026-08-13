import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  createPageMetadata,
  newsArticleJsonLd,
  videoObjectJsonLd,
} from '@/lib/seo';
import { MEDIA_COVERAGE } from '@/lib/constants';

export const metadata: Metadata = createPageMetadata({
  title: 'Media Coverage',
  description:
    "Flo Mobility in the news — interviews, TV features and on-site coverage of India's construction robots.",
  path: '/media-coverage',
});

export default function MediaCoverageLayout({ children }: { children: React.ReactNode }) {
  const itemSchema = MEDIA_COVERAGE.flatMap((m) => {
    if (m.videoId) {
      return [
        videoObjectJsonLd({
          name: m.title,
          description: m.description,
          uploadDate: m.date,
          thumbnailUrl: `https://i.ytimg.com/vi/${m.videoId}/hqdefault.jpg`,
          embedUrl: `https://www.youtube.com/embed/${m.videoId}`,
        }),
      ];
    }
    if (m.url) {
      return [
        newsArticleJsonLd({
          headline: m.title,
          datePublished: m.date,
          url: m.url,
          image: m.image ? absoluteUrl(m.image) : undefined,
          publisherName: m.outlet,
        }),
      ];
    }
    return [];
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Media Coverage', path: '/media-coverage' },
          ]),
          collectionPageJsonLd({
            name: 'Media Coverage',
            description: 'Flo Mobility press coverage, interviews and TV features.',
            path: '/media-coverage',
          }),
          ...itemSchema,
        ]}
      />
      {children}
    </>
  );
}

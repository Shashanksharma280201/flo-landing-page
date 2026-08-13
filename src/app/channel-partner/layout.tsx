import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Channel Partner Program',
  description:
    'Partner with Flo Mobility to bring autonomous robot deployments, fleet control, and robotics-as-a-service solutions to more sites.',
  path: '/channel-partner',
  image: '/about/showcase.avif',
});

export default function ChannelPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Channel Partner Program', path: '/channel-partner' },
        ])}
      />
      {children}
    </>
  );
}

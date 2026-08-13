import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from '@/lib/seo';

const description =
  'Autonomous material movement robots from Flo Mobility help construction and industrial sites move goods with less manual effort and better fleet visibility.';

export const metadata: Metadata = createPageMetadata({
  title: 'Material Movement Robots',
  description,
  path: '/offerings/material-movement',
  image: '/mmr-images/material-movement.avif',
});

export default function MaterialMovementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Offerings', path: '/offerings/material-movement' },
            { name: 'Material Movement', path: '/offerings/material-movement' },
          ]),
          serviceJsonLd({
            name: 'Material Movement Robots',
            description,
            path: '/offerings/material-movement',
            serviceType: 'Autonomous material movement robotics',
          }),
        ]}
      />
      {children}
    </>
  );
}

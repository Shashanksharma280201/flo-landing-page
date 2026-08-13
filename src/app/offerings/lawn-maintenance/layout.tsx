import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from '@/lib/seo';

const description =
  'Autonomous lawn maintenance robots from Flo Mobility help large properties and managed sites automate landscape maintenance workflows.';

export const metadata: Metadata = createPageMetadata({
  title: 'Lawn Maintenance Robots',
  description,
  path: '/offerings/lawn-maintenance',
  image: '/mmr-images/mmr-images-2.avif',
});

export default function LawnMaintenanceLayout({
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
            { name: 'Offerings', path: '/offerings/lawn-maintenance' },
            { name: 'Lawn Maintenance', path: '/offerings/lawn-maintenance' },
          ]),
          serviceJsonLd({
            name: 'Lawn Maintenance Robots',
            description,
            path: '/offerings/lawn-maintenance',
            serviceType: 'Autonomous lawn maintenance robotics',
          }),
        ]}
      />
      {children}
    </>
  );
}

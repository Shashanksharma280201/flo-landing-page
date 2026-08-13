import type { Metadata } from 'next';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbJsonLd, createPageMetadata, serviceJsonLd } from '@/lib/seo';

const description =
  'Flo Mobility Fleet Control helps teams deploy, monitor, assign tasks, and manage autonomous robot fleets from one platform.';

export const metadata: Metadata = createPageMetadata({
  title: 'Fleet Control Platform',
  description,
  path: '/offerings/fleet-control',
  image: '/mmr-images/all-robots.avif',
});

export default function FleetControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Offerings', path: '/offerings/fleet-control' },
            { name: 'Fleet Control', path: '/offerings/fleet-control' },
          ]),
          serviceJsonLd({
            name: 'Fleet Control Platform',
            description,
            path: '/offerings/fleet-control',
            serviceType: 'Autonomous robot fleet management software',
          }),
        ]}
      />
      {children}
    </>
  );
}

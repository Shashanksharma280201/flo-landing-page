import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { LegalShell } from '@/components/sections/legal/legal-shell';

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'How Flo Mobility collects, uses, and protects personal data across flomobility.com and our construction robotics services.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      {/* TODO(legal): replace this scaffold with the final approved Privacy Policy
          copy before deploying. Structure/metadata/UI are production-ready; the
          body text below is a placeholder. */}
      <p>
        This page describes how Flo Mobility Pvt. Ltd. (&ldquo;Flo Mobility&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects information
        gathered through <Link href="/">flomobility.com</Link> and our services.
      </p>
      <p>
        Our full, current Privacy Policy is being published here. In the meantime, for any
        privacy question or to request a copy of the policy, please{' '}
        <Link href="/contact">contact us</Link>.
      </p>
    </LegalShell>
  );
}

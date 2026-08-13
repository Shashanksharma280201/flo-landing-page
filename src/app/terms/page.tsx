import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { LegalShell } from '@/components/sections/legal/legal-shell';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Use',
  description:
    'The terms governing use of flomobility.com and Flo Mobility construction robotics services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use">
      {/* TODO(legal): replace this scaffold with the final approved Terms of Use
          copy before deploying. Structure/metadata/UI are production-ready; the
          body text below is a placeholder. */}
      <p>
        These terms govern your use of <Link href="/">flomobility.com</Link> and the
        services provided by Flo Mobility Pvt. Ltd. (&ldquo;Flo Mobility&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;).
      </p>
      <p>
        Our full, current Terms of Use are being published here. In the meantime, for any
        question about these terms, please <Link href="/contact">contact us</Link>.
      </p>
    </LegalShell>
  );
}

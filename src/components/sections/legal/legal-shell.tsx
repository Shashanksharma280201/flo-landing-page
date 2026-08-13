import type { ReactNode } from 'react';

/**
 * LegalShell — shared page frame for on-site legal documents (Privacy, Terms).
 * Matches the site design language: DM Sans headings, near-black text, a green
 * accent, and branded `prose` body copy. Server-rendered (no client JS).
 */
export function LegalShell({
  eyebrow = 'Legal',
  title,
  lastUpdated,
  children,
}: {
  eyebrow?: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-32 pb-24 sm:px-8 md:pt-40 md:pb-32">
      <p
        className="mb-4 text-[11px] font-bold tracking-[0.28em] text-[#286c00] uppercase"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {eyebrow}
      </p>
      <h1
        className="text-4xl font-black tracking-tight text-[#191c1a] sm:text-5xl md:text-6xl"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {title}
      </h1>
      <div className="mt-6 h-px w-16 bg-[#7ccd54]" />
      {lastUpdated && (
        <p
          className="mt-5 text-sm font-medium text-[rgba(25,28,26,0.45)]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Last updated: {lastUpdated}
        </p>
      )}
      <div className="prose prose-neutral prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#191c1a] prose-p:leading-[1.8] prose-p:text-[rgba(25,28,26,0.68)] prose-a:font-semibold prose-a:text-[#286c00] prose-a:no-underline hover:prose-a:underline prose-li:text-[rgba(25,28,26,0.68)] prose-strong:text-[#191c1a] mt-10 max-w-none">
        {children}
      </div>
    </section>
  );
}

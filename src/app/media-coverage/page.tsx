'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import {
  MEDIA_COVERAGE,
  MEDIA_OUTLETS,
  type MediaCategory,
  type MediaItem,
} from '@/lib/constants';
import { TrackedYouTubeIframe } from '@/components/shared/tracked-youtube-iframe';

// ─── Design tokens — FLO brand light theme ───────────────────────────────────
const GREEN = '#7ccd54';
const GREEN_D = '#286c00';
const TEXT = '#191c1a';
const MUTED = 'rgba(25,28,26,0.55)';
const DIM = 'rgba(25,28,26,0.12)';
const BG_DARK = '#0e1210';
const EASE = [0.16, 1, 0.3, 1] as const;

// Full-width, responsive page shell padding
const SHELL = 'mx-auto w-full max-w-[1800px] px-4 sm:px-8 lg:px-12 xl:px-16';

// Document/screenshot/infographic images are shown in FULL (object-contain on
// white) so nothing is cropped; event photos use object-cover.
const CONTAIN_IDS = new Set([
  'yourstory-haul-materials',
  'builtworlds-robotics-top-50',
  'economic-times-ai-innovators',
  'srx-podcast-manesh-jain',
  'india-deeptech-report-2025',
  'construction-world-flow-not-move',
]);

const FILTERS: { key: 'all' | MediaCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'press', label: 'Press' },
  { key: 'video', label: 'Video' },
  { key: 'event', label: 'Events' },
];

const PRESS_KIT = [
  'Company Overview',
  'Logo Pack',
  'Product Images',
  'Founder Photos',
  'Brand Guidelines',
];

const MEDIA_EMAIL = 'media@flomobility.com';

// Fallback visual for items without a photo (branded panel with the outlet name)
function OutletPanel({ outlet }: { outlet: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center px-6 text-center"
      style={{
        background: 'radial-gradient(120% 120% at 20% 0%, #17301d 0%, #0e1210 60%)',
      }}
    >
      <span
        className="text-2xl font-black tracking-tight text-white/90"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        {outlet}
      </span>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(item.videoId);
  const fitContain = CONTAIN_IDS.has(item.id);
  const thumb =
    item.image ??
    (item.videoId ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg` : undefined);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.05, ease: EASE }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,28,26,0.10)]"
      style={{ borderColor: DIM }}
    >
      {/* Media */}
      <div
        className={`relative aspect-video w-full overflow-hidden ${
          fitContain ? 'bg-white' : 'bg-[#eef0ee]'
        }`}
      >
        {hasVideo && playing ? (
          <TrackedYouTubeIframe
            videoId={item.videoId!}
            title={item.title}
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <>
            {thumb ? (
              <Image
                src={thumb}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className={
                  fitContain
                    ? 'object-contain p-2'
                    : 'object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                }
              />
            ) : (
              <OutletPanel outlet={item.outlet} />
            )}
            {hasVideo ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${item.title}`}
                className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/[0.04]"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ background: GREEN }}
                >
                  <Play className="h-6 w-6 translate-x-[1px] text-white" fill="white" />
                </span>
              </button>
            ) : item.url ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.title}
                className="absolute inset-0"
              />
            ) : null}
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-[13px] font-bold"
            style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
          >
            {item.outlet}
          </span>
          <time
            className="shrink-0 text-[12px] font-medium"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
            dateTime={item.date}
          >
            {item.dateLabel}
          </time>
        </div>
        <h2
          className="text-[17px] leading-snug font-semibold"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {item.title}
        </h2>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {item.description}
        </p>
        {(hasVideo || item.url) && (
          <div className="mt-auto pt-2">
            {hasVideo ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
                style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
              >
                {item.cta ?? 'Watch'} <Play className="h-3.5 w-3.5" fill="currentColor" />
              </button>
            ) : (
              <Link
                href={item.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
                style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
              >
                {item.cta ?? 'Read more'} <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ─── Featured story — complete image (undistorted) beside the text ────────────
function FeaturedCard({ item }: { item: MediaItem }) {
  const fitContain = CONTAIN_IDS.has(item.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px' }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid overflow-hidden rounded-3xl border bg-white lg:grid-cols-2"
      style={{ borderColor: DIM }}
    >
      {/* Complete image — object-contain so the whole image shows top-to-bottom,
          undistorted (never stretched or cropped). */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] ${
          fitContain ? 'bg-white' : 'bg-[#eef0ee]'
        }`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={fitContain ? 'object-contain p-4' : 'object-cover'}
          />
        ) : (
          <OutletPanel outlet={item.outlet} />
        )}
      </div>

      <div className="flex flex-col justify-center gap-4 p-7 md:p-10 lg:p-12">
        <div className="flex items-center gap-3">
          <span
            className="text-[13px] font-bold"
            style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
          >
            {item.outlet}
          </span>
          <span style={{ color: DIM }}>•</span>
          <span
            className="text-[13px] font-medium"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            {item.dateLabel}
          </span>
        </div>
        <h2
          className="text-2xl leading-tight font-black tracking-tight sm:text-3xl lg:text-4xl"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          {item.title}
        </h2>
        <p
          className="text-[15px] leading-relaxed lg:text-base"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          {item.description}
        </p>
        {item.url && (
          <Link
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-bold text-white transition-transform duration-200 hover:scale-105"
            style={{ background: GREEN, fontFamily: 'var(--font-dm-sans)' }}
          >
            {item.cta ?? 'Read more'} <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MediaCoveragePage() {
  const [filter, setFilter] = useState<'all' | MediaCategory>('all');

  const sorted = useMemo(
    () => [...MEDIA_COVERAGE].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const featured = useMemo(() => sorted.find((m) => m.featured), [sorted]);

  const gridItems = useMemo(() => {
    const rest = sorted.filter((m) => m.id !== featured?.id);
    return filter === 'all' ? rest : rest.filter((m) => m.category === filter);
  }, [sorted, featured, filter]);

  return (
    <div className="bg-[#f5f5f5]">
      {/* Hero */}
      <section className={`${SHELL} pt-32 pb-12 md:pt-40 md:pb-16`}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 text-[12px] font-bold tracking-[0.28em] uppercase"
          style={{ color: GREEN_D, fontFamily: 'var(--font-dm-sans)' }}
        >
          Newsroom
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: TEXT, fontFamily: 'var(--font-dm-sans)' }}
        >
          Milestones &amp; Media
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
        >
          The defining moments in Flo Mobility&apos;s journey — product launches, industry
          recognition, media features, and key events.
        </motion.p>
      </section>

      {/* As featured in */}
      <section className="border-y" style={{ borderColor: DIM, background: '#fff' }}>
        <div className={`${SHELL} flex flex-col gap-6 py-10`}>
          <p
            className="text-[11px] font-bold tracking-[0.28em] uppercase"
            style={{ color: MUTED, fontFamily: 'var(--font-dm-sans)' }}
          >
            As featured in
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-12">
            {MEDIA_OUTLETS.map((outlet) =>
              outlet.logo ? (
                <Image
                  key={outlet.name}
                  src={outlet.logo}
                  alt={outlet.name}
                  width={160}
                  height={44}
                  className="h-8 w-auto object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 md:h-9"
                />
              ) : (
                <span
                  key={outlet.name}
                  className="text-lg font-black tracking-tight md:text-xl"
                  style={{
                    color: 'rgba(25,28,26,0.34)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  {outlet.name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Featured story */}
      {featured && (
        <section className={`${SHELL} pt-16 md:pt-24`}>
          <FeaturedCard item={featured} />
        </section>
      )}

      {/* Coverage grid */}
      <section className={`${SHELL} py-16 md:py-20`}>
        <div className="mb-10 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className="rounded-full border px-4 py-2 text-[14px] font-semibold transition-all duration-200"
                style={{
                  borderColor: active ? GREEN_D : DIM,
                  background: active ? GREEN_D : 'transparent',
                  color: active ? '#fff' : TEXT,
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gridItems.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Press & media kit band */}
      <section style={{ background: BG_DARK }}>
        <div className={`${SHELL} grid gap-10 py-16 md:grid-cols-2 md:py-24`}>
          <div>
            <p
              className="mb-3 text-[12px] font-bold tracking-[0.28em] uppercase"
              style={{ color: GREEN, fontFamily: 'var(--font-dm-sans)' }}
            >
              For journalists
            </p>
            <h2
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Press &amp; Media
            </h2>
            <p
              className="mt-4 max-w-md text-[15px] leading-relaxed"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              Whether you&apos;re covering Flo Mobility, requesting an interview, or
              looking for official brand assets, our team is here to help.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* TODO(press): point to the real press-kit asset bundle. */}
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-bold text-white transition-transform duration-200 hover:scale-105"
                style={{ background: GREEN, fontFamily: 'var(--font-dm-sans)' }}
              >
                Download Press Kit <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${MEDIA_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.25)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                Contact Media Team
              </a>
            </div>
            <p
              className="mt-5 text-[13px]"
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              📩 Media enquiries:{' '}
              <a
                href={`mailto:${MEDIA_EMAIL}`}
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                {MEDIA_EMAIL}
              </a>
            </p>
          </div>

          <div className="md:justify-self-end">
            <p
              className="mb-4 text-[11px] font-bold tracking-[0.28em] uppercase"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-dm-sans)',
              }}
            >
              The press kit includes
            </p>
            <ul className="flex flex-col gap-3">
              {PRESS_KIT.map((entry) => (
                <li
                  key={entry}
                  className="flex items-center gap-3 text-[15px]"
                  style={{
                    color: 'rgba(255,255,255,0.82)',
                    fontFamily: 'var(--font-dm-sans)',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: GREEN }}
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

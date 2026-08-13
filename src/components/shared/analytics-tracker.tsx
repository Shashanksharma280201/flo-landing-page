'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

const SCROLL_THRESHOLD = 90;
const FILE_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'zip',
]);

function getRouteKey(pathname: string) {
  if (pathname === '/') return 'home';
  if (pathname === '/blogs' || pathname.startsWith('/blogs/')) return 'blog';
  if (pathname.startsWith('/offerings/')) return 'product';
  return null;
}

function getAbsoluteUrl(href: string) {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function fileInfo(url: URL) {
  const fileName = decodeURIComponent(url.pathname.split('/').pop() ?? '');
  const extension = fileName.includes('.')
    ? fileName.split('.').pop()?.toLowerCase()
    : '';

  if (!fileName || !extension || !FILE_EXTENSIONS.has(extension)) {
    return null;
  }

  return { fileName, extension };
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedScrollRoutes = useRef(new Set<string>());
  const trackedNativeVideos = useRef(new WeakSet<HTMLVideoElement>());

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest('a[href]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      const url = getAbsoluteUrl(anchor.href);
      if (!url) return;

      const download = fileInfo(url);
      if (download) {
        trackEvent('file_download', {
          file_name: download.fileName,
          file_extension: download.extension,
          link_url: url.href,
        });
      }

      if (url.origin !== window.location.origin) {
        trackEvent('click', {
          link_url: url.href,
          outbound: true,
        });
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  useEffect(() => {
    const handleSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;

      const form = event.target;
      const searchField = form.querySelector<HTMLInputElement>(
        'input[type="search"], input[name="search"], input[name="q"]',
      );
      const searchTerm = searchField?.value.trim();

      if (!searchTerm) return;

      trackEvent('search', {
        search_term: searchTerm,
      });
    };

    document.addEventListener('submit', handleSubmit, { capture: true });
    return () => document.removeEventListener('submit', handleSubmit, { capture: true });
  }, []);

  useEffect(() => {
    const getVideoMetadata = (video: HTMLVideoElement) => {
      const source = video.currentSrc || video.querySelector('source')?.src || '';
      return {
        title:
          video.getAttribute('title') ||
          video.getAttribute('aria-label') ||
          source.split('/').pop() ||
          'site video',
        url: source,
        duration: Number.isFinite(video.duration) ? Math.round(video.duration) : 0,
      };
    };

    const handlePlay = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement)) return;
      if (trackedNativeVideos.current.has(event.target)) return;

      trackedNativeVideos.current.add(event.target);
      const metadata = getVideoMetadata(event.target);
      trackEvent('video_start', {
        video_title: metadata.title,
        video_url: metadata.url,
        video_duration: metadata.duration,
      });
    };

    const handleEnded = (event: Event) => {
      if (!(event.target instanceof HTMLVideoElement)) return;

      const metadata = getVideoMetadata(event.target);
      trackEvent('video_complete', {
        video_title: metadata.title,
        video_duration: metadata.duration,
      });
    };

    document.addEventListener('play', handlePlay, true);
    document.addEventListener('ended', handleEnded, true);
    return () => {
      document.removeEventListener('play', handlePlay, true);
      document.removeEventListener('ended', handleEnded, true);
    };
  }, []);

  useEffect(() => {
    const routeKey = getRouteKey(pathname);
    if (!routeKey || trackedScrollRoutes.current.has(pathname)) {
      return;
    }

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const percentScrolled = Math.round((window.scrollY / scrollableHeight) * 100);
      if (percentScrolled < SCROLL_THRESHOLD) return;

      trackedScrollRoutes.current.add(pathname);
      trackEvent('scroll', {
        percent_scrolled: SCROLL_THRESHOLD,
        page_type: routeKey,
        page_path: pathname,
      });
      window.removeEventListener('scroll', handleScroll);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return null;
}

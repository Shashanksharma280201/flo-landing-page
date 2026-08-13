'use client';

import { useEffect, useId, useMemo, useRef } from 'react';
import { trackEvent, youtubeUrl } from '@/lib/analytics';

interface YouTubeStateChangeEvent {
  data: number;
  target: YouTubePlayer;
}

interface YouTubePlayer {
  getDuration: () => number;
  destroy: () => void;
}

interface YouTubeApi {
  Player: new (
    elementId: string,
    options: {
      events: {
        onStateChange: (event: YouTubeStateChangeEvent) => void;
      };
    },
  ) => YouTubePlayer;
  PlayerState: {
    PLAYING: number;
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | null = null;

function loadYouTubeApi() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API is only available in the browser.'));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve) => {
      const previousReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        if (window.YT) {
          resolve(window.YT);
        }
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    });
  }

  return youtubeApiPromise;
}

function withTrackingParams(src: string) {
  const origin =
    typeof window === 'undefined' ? 'https://www.youtube.com' : window.location.origin;
  const url = new URL(src, origin);
  url.searchParams.set('enablejsapi', '1');
  if (typeof window !== 'undefined') {
    url.searchParams.set('origin', window.location.origin);
  }
  return url.toString();
}

interface TrackedYouTubeIframeProps {
  videoId: string;
  title: string;
  src: string;
  className?: string;
  allow?: string;
  allowFullScreen?: boolean;
}

export function TrackedYouTubeIframe({
  videoId,
  title,
  src,
  className,
  allow,
  allowFullScreen = true,
}: TrackedYouTubeIframeProps) {
  const reactId = useId();
  const iframeId = useMemo(
    () => `youtube-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`,
    [reactId],
  );
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let player: YouTubePlayer | null = null;
    let disposed = false;

    loadYouTubeApi().then((YT) => {
      if (disposed) return;

      player = new YT.Player(iframeId, {
        events: {
          onStateChange: (event) => {
            // The YouTube IFrame API can emit a state change before the player
            // is fully initialised (e.g. when adopting a freshly-mounted iframe),
            // in which case event.target lacks player methods. Guard against it.
            const target = event.target;
            const duration =
              target && typeof target.getDuration === 'function'
                ? Math.round(target.getDuration() || 0)
                : 0;

            if (event.data === YT.PlayerState.PLAYING && !startedRef.current) {
              startedRef.current = true;
              trackEvent('video_start', {
                video_title: title,
                video_url: youtubeUrl(videoId),
                video_duration: duration,
              });
            }

            if (event.data === YT.PlayerState.ENDED && !completedRef.current) {
              completedRef.current = true;
              trackEvent('video_complete', {
                video_title: title,
                video_duration: duration,
              });
            }
          },
        },
      });
    });

    return () => {
      disposed = true;
      player?.destroy();
    };
  }, [iframeId, title, videoId]);

  return (
    <iframe
      id={iframeId}
      className={className}
      src={withTrackingParams(src)}
      title={title}
      allow={allow}
      allowFullScreen={allowFullScreen}
    />
  );
}

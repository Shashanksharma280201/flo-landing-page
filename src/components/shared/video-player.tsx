"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useHasMounted } from "@/hooks/use-has-mounted";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  className?: string;
  isBackground?: boolean;
  priority?: boolean;
}

export function VideoPlayer({
  videoId,
  title,
  className,
  isBackground = false,
  priority = false,
}: VideoPlayerProps) {
  const hasMounted = useHasMounted();
  // Never auto-load on mount — always start with thumbnail/poster
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: containerRef, isIntersecting: shouldPreconnect } =
    useIntersectionObserver({
      rootMargin: "200px",
      triggerOnce: true,
    });

  // For background (hero) videos: defer iframe until browser is idle
  // This keeps the YouTube iframe off the critical render path
  useEffect(() => {
    if (!isBackground) return;
    if (typeof window === "undefined") return;

    let handle: ReturnType<typeof setTimeout>;
    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setIsLoaded(true),
        { timeout: 2000 },
      );
      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      };
    } else {
      handle = setTimeout(() => setIsLoaded(true), 1000);
      return () => clearTimeout(handle);
    }
  }, [isBackground]);

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {hasMounted && shouldPreconnect && (
        <>
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
          <link rel="preconnect" href="https://static.doubleclick.net" />
        </>
      )}
      <div
        ref={containerRef}
        className={cn(
          "group relative overflow-hidden bg-muted",
          !isBackground ? "aspect-video rounded-xl shadow-2xl" : "h-full w-full",
          className
        )}
      >
        {!isLoaded ? (
          <button
            onClick={handlePlay}
            className="relative h-full w-full"
            aria-label={`Play video: ${title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt={`Thumbnail for ${title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
              priority={priority}
            />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-current" />
              </div>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${
              isBackground ? 1 : 0
            }&loop=1&playlist=${videoId}&controls=${
              isBackground ? 0 : 1
            }&rel=0&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className={cn(
              "h-full w-full border-0",
              isBackground && "pointer-events-none scale-150"
            )}
          />
        )}
      </div>
    </>
  );
}

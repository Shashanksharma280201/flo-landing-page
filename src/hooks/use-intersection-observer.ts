import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0,
  root = null,
  rootMargin = "0px",
  triggerOnce = false,
}: UseIntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element || (triggerOnce && isIntersecting)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, isIntersecting]);

  return { ref: targetRef, entry, isIntersecting };
}

import { useState, useEffect, useRef } from 'react';
import { PerformanceService, WebVitalsMetrics } from '../services/PerformanceService';

/**
 * Hook to consume real-time Web Vitals and network conditions in any component
 */
export function useWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>(PerformanceService.getMetrics());

  useEffect(() => {
    const unsubscribe = PerformanceService.subscribe((updated) => {
      setMetrics(updated);
    });
    return () => unsubscribe();
  }, []);

  return metrics;
}

/**
 * Hook for lazy loading components or expensive visuals when scrolled into the viewport
 */
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const rootMargin = options?.rootMargin || '100px';
  const threshold = options?.threshold ?? 0;

  useEffect(() => {
    const node = targetRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, { rootMargin, threshold });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  return { targetRef, isIntersecting, hasIntersected };
}
